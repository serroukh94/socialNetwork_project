'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config'); 

// Configuration de Mongoose pour utiliser les promesses globales de Node.js
mongoose.Promise = global.Promise;

// Connexion à la base de données MongoDB
mongoose.connect(config.dbURI)
    .then(() => {
        console.log('La connexion à la base de données a été réalisée correctement');

        // Démarrage du serveur Express sur le port spécifié dans le fichier de configuration
        app.listen(config.port, () => {
            console.log(`Serveur fonctionnant sur http://localhost:${config.port}`)
        });
    })
    .catch(err => {
        console.error('Erreur de connexion à la base de données:', err);
    });
