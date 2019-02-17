'use strict';
// const utils = require('../utils/utils');
const db = require('../models');
const { AuthenticationError } = require('../utils/errors');

module.exports = {
  UserExistsByEmail,
  createNewFbUser
};

async function UserExistsByEmail (email) {
  const user = await db.User.findOne({
    where: {
      email: email
    }
  });
  if (!user) {
    return false;
  }
  return true;
}

async function createNewFbUser (id, email, name) {
  const user = await db.User.create({
    id: id,
    email: email,
    name: name
  });
  return user;
}
