const createHttpError = require('http-errors');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      atributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
    });
    res.status(200).send({ data: foundTasks });
  } catch (err) {
    next(err);
  }
};
