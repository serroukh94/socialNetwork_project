const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const app = require('../../../app'); 
const User = require('../../../models/user');

describe('POST /api/login', () => {
    let mongoServer;
    let user;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        consoleErrorOriginal = console.error;
        console.error = jest.fn();

        const password = await bcrypt.hash('123456', 10);
        user = new User({
            nick: 'john_doe',
            email: 'test@example.com',
            password: password,
        });
        await user.save();
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        console.error = consoleErrorOriginal;
    });

    it('should authenticate a user and return a JWT token', async () => {
        const userData = {
            email: 'test@example.com',
            password: '123456',
            gettoken: true
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should authenticate a user and return user data without a JWT token', async () => {
        const userData = {
            email: 'test@example.com',
            password: '123456'
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe(userData.email);
    });

    it('should not authenticate a user with incorrect email', async () => {
        const userData = {
            email: 'wrong@example.com',
            password: '123456'
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("L'utilisateur n'a pas pu être identifié");
    });

    it('should not authenticate a user with incorrect password', async () => {
        const userData = {
            email: 'test@example.com',
            password: 'wrongpassword'
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("L'utilisateur n'a pas pu être identifié");
    });
    
    it('should return 500 if bcrypt compare fails', async () => {
        jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => Promise.reject(new Error('bcrypt error')));

        const userData = {
            email: 'test@example.com',
            password: '123456'
        };

        const response = await request(app)
            .post('/api/login')
            .send(userData);

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Erreur lors de la vérification du mot de passe');
        expect(response.body.error).toBeDefined();

        bcrypt.compare.mockRestore(); 
    });
});
