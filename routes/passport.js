'use strict';

const userServices = require('../services/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const { ExtractJWT } = require('passport-jwt');
const {
  // JWT_SECRET,
  FB_ID,
  FB_SECRET
} = process.env;
const FacebookTokenStrategy = require('facebook-token').Strategy;
// const Response = require('../utils/response');
// const authSessions = require('./authSessions');
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  // find the user
  const user = await userServices.findUserByEmail(email);
  // handle not finding the user
  if (!user) {
    return done(null, false);
  }
  // todo: check if password is correct
  return user;
}));

passport.use('facebook-token', new FacebookTokenStrategy({
  clientID: FB_ID,
  clientSecret: FB_SECRET
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('acctok', accessToken);
    console.log('reftok', refreshToken);
    const user = await userServices.UserExistsByEmail(profile.emails[0].value);
    if (user) {
      return done(null, user);
    }
    const newUser = await userServices.createNewFbUser(profile.id, profile.emails[0].value, profile.name.givenName);
    done(null, newUser);
  } catch (err) {
    done(err, false, err.message);
  }
}));

module.exports = {
  passport,
  loginPassport
};

async function loginPassport (req, res, next) {
  return true;
}
