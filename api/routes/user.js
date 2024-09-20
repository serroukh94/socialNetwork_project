'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlewares/authenticated');


api.get('/home', UserController.home);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
<<<<<<< Updated upstream

=======
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
>>>>>>> Stashed changes

module.exports = api;