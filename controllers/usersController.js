const { hashSync } = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/User');

module.exports.createUsers = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);

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

module.exports.getUserTasks = async (req, res, next) => {
  const { id } = req.params;
  try {
    //знаходимо юзера
    const foundUser = await User.findByPk(id);
    if (!foundUser) {
      return next(createHttpError(404, 'User not found'));
    }
    const foundUserTasks = await foundUser.getTasks({
      raw: true,
      attributes: { exclude: ['createdAt', 'updatedAt'] },   //-параметри, які я не хочу відображати
    });
    res.status(200).send({ data: foundUserTasks });
  } catch (err) {
    next(err);
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

module.exports.updateOrCreateUser = async (req, res, next) => {
  // перевірити, чи існує 1+1=2-
  // + оновити
  // - створити

  // спробувати оновити 1
  // якщо updatedUsersCount === 1, то все, 200      1+0=1+
  // якщо updatedUsersCount === 0, то створити, 201 1+1=2+

  const {
    body,
    params: { id },
  } = req;

  try {
    const updatedUsersCount = await User.update(body, {
      where: { id },
      raw: true,
      returning: true,
    });

    if (!updatedUsersCount) {
      // create
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUsersCount, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
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
