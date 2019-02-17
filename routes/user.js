'use strict';
const JWT = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { AuthorizationError } = require('../utils/errors');
const userServices = require('../services/user');
module.exports = {
  facebookOauth,
  signToken
};

async function facebookOauth (req, res, next) {
  const token = signToken(req.user);
  res.status(200).json({ token });
}

async function signToken (user) {
  return JWT.sign({
    iss: 'Nenad',
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1)
  }, JWT_SECRET);
}
