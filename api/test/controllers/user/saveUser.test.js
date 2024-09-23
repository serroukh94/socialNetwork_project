const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../../../app')
const User = require('../../../models/user')

// saveUser function
describe('POST /api/register', () => {
  let mongoServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    consoleErrorOriginal = console.error;
    console.error = jest.fn();
  })

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.error = consoleErrorOriginal;
  })
 
  it('should create a new user and return 200 status code', async () => {
    const userData = {
      nick: 'john_doe',
      email: 'john@example.com',
      password: '123456',
    }

    const response = await request(app).post('/api/register').send(userData)

    expect(response.status).toBe(200)
    expect(response.body.user).toHaveProperty('_id')
    expect(response.body.user.name).toBe(userData.name)
    expect(response.body.user.email).toBe(userData.email.toLowerCase())
  })

  it('should not create a user with duplicate email and return 409 status code', async () => {
    const userData = {
      nick: 'jane_doe',
      email: 'john@example.com',
      password: 'password',
    }

    const response = await request(app).post('/api/register').send(userData)

    expect(response.status).toBe(409)
    expect(response.body.message).toBe("L'email ou le pseudo est déjà utilisé")
  })

  it('should handle server errors during user registration', async () => {
    // Simuler une erreur de serveur lors de l'enregistrement
    const mock = jest.spyOn(User.prototype, 'save')
    mock.mockImplementationOnce(() => Promise.reject(new Error('Failed to save user')))

    const userData = {
      nick: 'tom_jerry',
      email: 'tom@example.com',
      password: 'securepassword',
    }

    const response = await request(app).post('/api/register').send(userData)

    expect(response.status).toBe(500)
    expect(response.body.message).toBe("Erreur lors de l'enregistrement de l'utilisateur")
    mock.mockRestore()
  })
})
