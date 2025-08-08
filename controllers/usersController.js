const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');

// const passw = '123';
const HASH_SALT = 10;
// const paswwHash = hashSync(passw, HASH_SALT);
// console.log(paswwHash);

module.exports.createUsers = async (req, res, next) => {
  const { body } = req;
  try {
    body.passwordHush = hashSync(body.passwordHush, HASH_SALT);
    const createdUser = await User.create(body);

    //видалити сек"юрні властивості
    // const preparedUser = { ...createdUser.get() };
    // delete preparedUser.passwordHush;
    // delete preparedUser.createdAt;
    // delete preparedUser.updatedAt;

    const preparedUser = _.omit(createdUser.get(), [
      'passwordHush',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).json(preparedUser);
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
