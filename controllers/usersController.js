const { User } = require('../models');

module.exports.createUsers = async (req, res, next) => {
  try {
    const createdUser = await User.create(req.body);
    res.status(201).json(createdUser);
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
