'use strict'

const express = require('express');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();

// Utilisation de CORS pour gérer les politiques de partage des ressources
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Authorization', 'Content-Type', 'X-API-KEY', 'Origin', 'X-Requested-With', 'Accept', 'Access-Control-Allow-Request-Method']
}));

//charger les routes
const user_routes = require('./routes/user');


// Middleware pour analyser les corps des requêtes en JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use('/api', user_routes);


module.exports = app;