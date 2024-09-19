'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config'); 

exports.ensureAuth = function (req, res, next) {
  // Vérification de la présence de l'en-tête d'autorisation
  if (!req.headers.authorization) {
    return res.status(403).send({ message: "La requête ne contient pas l'en-tête d'authentification." });
  }

  // Extraction et nettoyage du token
  let token = req.headers.authorization.replace(/['"]+/g, '');
  
  try {
    // Décodage du token pour obtenir le payload
    const payload = jwt.decode(token, config.secret);

    // Vérification de l'expiration du token
    if (payload.exp <= moment().unix()) {
      return res.status(401).send({ message: 'Le token a expiré.' });
    }

    // Ajout des informations de l'utilisateur à la requête
    req.user = payload;
  } catch (ex) {
    console.error('Error decoding token:', ex);
    return res.status(404).send({ message: "Le token n'est pas valide." });
  }

  // Passage au middleware suivant
  next();
};
