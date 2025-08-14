const createHttpError = require('http-errors');
const { Task } = require('../models/Task');
const { User } = require('../models/User');

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
      atributes: { exclude: ['createdAt', 'updatedAt'] },   //-параметри, які я не хочу відображати
    });
    res.status(200).send({ data: foundUserTasks });
  } catch (err) {
    next(err);
  }
};
