'use strict'

require('dotenv').config();

const config = {
    port: process.env.PORT,
    dbURI: process.env.MONGODB_URI,
    secret: process.env.JWT_SECRET
};

module.exports = config;
