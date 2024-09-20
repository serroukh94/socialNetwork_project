'use strict'

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const User = require('../models/user');
const jwt = require('../services/jwt');


function home(req, res) {
  res.status(200).send({ message: 'Ok' })
}


/**
 * Enregistre un nouvel utilisateur dans la base de données après validation des champs requis et vérification
 * que l'email ou le pseudo n'est pas déjà utilisé.
 *
 * @param {Request} req - L'objet requête contenant les données de l'utilisateur (nom, prénom, pseudo, email, mot de passe).
 * @param {Response} res - L'objet réponse utilisé pour envoyer une réponse à l'utilisateur.
 */
async function saveUser(req, res) {
  let params = req.body;
  let user = new User({
    nick: params.nick.toLowerCase(),
    email: params.email.toLowerCase(),
  });

  if (!params.nick || !params.email || !params.password) {
    return res.status(400).send({ message: 'Envoyez tous les champs nécessaires' });
  }

  try {
    const foundUser = await User.findOne({
      $or: [
        { email: user.email },
        { nick: user.nick }
      ]
    }).exec();

    if (foundUser) {
      return res.status(409).send({ message: "L'email ou le pseudo est déjà utilisé" });
    }

    const hash = await bcrypt.hash(params.password, SALT_ROUNDS);
    user.password = hash;
    const userStored = await user.save();

    userStored.password = undefined; 
    return res.status(200).send({ user: userStored });
  } catch (err) {
    return res.status(500).send({
      message: "Erreur lors de l'enregistrement de l'utilisateur",
      error: err
    });
  }
}

/**
 * Authentifie un utilisateur en vérifiant son email et son mot de passe, et peut retourner un token JWT.
 *
 * @param {Request} req - L'objet requête contenant l'email et le mot de passe de l'utilisateur.
 * @param {Response} res - L'objet réponse utilisé pour envoyer l'utilisateur authentifié ou un message d'erreur.
 */
async function loginUser(req, res) {
  let params = req.body;
  let email = params.email.toLowerCase();
  let password = params.password;

  try {
    const user = await User.findOne({ email: email }).exec();
    if (!user) {
      return res.status(404).send({ message: "L'utilisateur n'a pas pu être identifié" });
    }

    const check = await bcrypt.compare(password, user.password);
    if (check) {
      if (params.gettoken) {
        return res.status(200).send({ token: jwt.createToken(user) });
      } else {
        user.password = undefined;
        return res.status(200).send({ user });
      }
    } else {
      return res.status(404).send({ message: "L'utilisateur n'a pas pu être identifié" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Erreur lors de la vérification du mot de passe',
      error: err,
    });
  }
}

/**
 * Met à jour les informations d'un utilisateur spécifié, à l'exception du mot de passe.
 *
 * @param {Request} req - L'objet requête, contenant les nouvelles données à mettre à jour et l'ID de l'utilisateur dans les paramètres URL.
 * @param {Response} res - L'objet réponse, utilisé pour renvoyer les informations de l'utilisateur mis à jour ou un message d'erreur.
 */
async function updateUser(req, res) {
  let userId = req.params.id;
  let update = { ...req.body };
  delete update.password;

  if (userId !== req.user.sub) {
    return res.status(403).send({ message: "Vous n'avez pas la permission de mettre à jour les données de cet utilisateur." });
  }

  try {
    const email = update.email ? update.email.toLowerCase() : null;
    const nick = update.nick ? update.nick.toLowerCase() : null;

    const user = await User.findOne({
      $or: [
        { email: email },
        { nick: nick }
      ],
      _id: { $ne: userId }
    }).exec();

    if (user) {
      return res.status(409).send({ message: "L'email ou le pseudo est déjà utilisé." });
    }

    let userUpdated = await User.findByIdAndUpdate(userId, update, { new: true });
    if (!userUpdated) {
      return res.status(404).send({ message: "Impossible de mettre à jour l'utilisateur." });
    }
    userUpdated.password = undefined;
    return res.status(200).send({ user: userUpdated });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Erreur lors de la requête", error: err });
  }
}

module.exports = {
    home,
    saveUser,
    loginUser,
    updateUser
  }
  