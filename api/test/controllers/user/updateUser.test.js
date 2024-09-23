const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../../app');  
const User = require('../../../models/user');
const { createToken } = require('../../../services/jwt');

describe('PUT /api/update-user/:id', () => {
  let mongoServer;
  let userA, userB, tokenA;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    consoleErrorOriginal = console.error;
    console.error = jest.fn();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.error = consoleErrorOriginal;
  });
  beforeEach(async () => {
    // Nettoyer la collection User avant chaque test
    await User.deleteMany({});

    // Créer des utilisateurs de test
    userA = await User.create({
      email: 'userA@example.com',
      password: 'passwordA',
      nick: 'nickA',
     
    });
    userB = await User.create({
      email: 'userB@example.com',
      password: 'passwordB',
      nick: 'nickB',
   
    });

    tokenA = createToken(userA);
  });

  it('should allow a user to update their own profile', async () => {
    const newNick = 'UserAUpdated';
    const response = await request(app)
      .put(`/api/update-user/${userA._id}`)
      .set('Authorization', tokenA)
      .send({ nick: newNick });

    expect(response.status).toBe(200);
    expect(response.body.user.nick).toBe(newNick);
  });

  it('should not allow a user to update another user\'s profile', async () => {
    const response = await request(app)
      .put(`/api/update-user/${userB._id}`)
      .set('Authorization', tokenA)
      .send({ name: 'UserB Updated' });

    expect(response.status).toBe(403);
  });

  it('should not update user if email already exists', async () => {
    await User.create({
      email: 'duplicate@example.com',
      password: 'password',
      nick: 'dupUser',
 
    });

    const response = await request(app)
      .put(`/api/update-user/${userA._id}`)
      .set('Authorization', tokenA)
      .send({ email: 'duplicate@example.com' })
      .send({nick: 'dupUser'});

    expect(response.status).toBe(409);
    expect(response.body.message).toContain("L'email ou le pseudo est déjà utilisé");
  });

  it('should handle database errors on user update', async () => {
    jest.spyOn(User, 'findByIdAndUpdate').mockRejectedValue(new Error('Simulated update error'));
  
    const response = await request(app)
      .put(`/api/update-user/${userA._id}`)
      .set('Authorization', tokenA)
      .send({ name: 'New Name' });
  
    expect(response.status).toBe(500);
    expect(response.body.message).toContain("Erreur lors de la requête");
  
    User.findByIdAndUpdate.mockRestore();
  });
  
});
