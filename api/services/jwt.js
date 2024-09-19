'use strict'

require('dotenv').config();
const jwt= require('jwt-simple');
const moment = require('moment');
const secret = process.env.JWT_SECRET;

exports.createToken = function(user) {
    const payload = {
        sub: user._id,
        nick: user.nick, 
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};