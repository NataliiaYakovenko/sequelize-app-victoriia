const { Router } = require('express');
const usersController = require('../controllers/usersController');
const { paginate } = require('../middleware');

const userRouter = Router();

// userRouter.post('/users', usersController.createUsers);

userRouter
  .route('/')
  .get(paginate.paginateUsers, usersController.getUsers)
  .post(usersController.createUsers);

userRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUser)
  .delete(usersController.deleteUserById);

userRouter.get('/:id/tasks', usersController.getUserTasks);

module.exports = userRouter;
