const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models');


module.exports.createUsers = async (req, res, next) => {
  const { body } = req;
  try {

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

    res.status(201).json({ data: preparedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit, offset } = req.pagination;
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: { exclude: ['passwordHush', 'createdAt', 'updatedAt'] },
      limit: limit,
      offset: offset,
      order: [['id']],
    });
    res.status(200).send({ date: foundUsers });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundUserById = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwordHush', 'createdAt', 'updatedAt'] },
    });

    if (!foundUserById) {
      return res.status(400).send([{ status: 400, mesage: 'User not found' }]);
    }

    res.status(200).send({ date: foundUserById });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const updatedUser = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUser) {
      return res
        .status(404)
        .send([{ status: 404, message: 'User not update' }]);
    }

    const preparedUser = _.omit(updatedUser, [
      'passwordHush',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).json({ data: preparedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletUser = await User.destroy({ where: { id } });
    if (!deletUser) {
      return res.status(404).send([{ status: 404, message: 'User not found' }]);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
