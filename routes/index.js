'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const h = require('./handlers');
const user = require('./user');
const session = require('./session');

const mobileRouter = express.Router();

mobileRouter.use(session);
mobileRouter.use(bodyParser.json());
mobileRouter.use(bodyParser.urlencoded({
  extended: true
}));

mobileRouter.post(`/oauth/facebook`, passport.authenticate('facebook-token'), user.facebookOauth);

// error handling
mobileRouter.use(h.notFound);
mobileRouter.use(h.error);

module.exports = {
  mobileRouter
};
