const { Router } = require('express');
const usersController = require('../controllers/usersController');

const userRouter = Router();

userRouter
  .route('/')
  .get(usersController.getUsers)
  .post(usersController.createUsers);

userRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = userRouter;
