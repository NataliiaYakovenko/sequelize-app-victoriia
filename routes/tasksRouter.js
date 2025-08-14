const { Router } = require('express');
const tasksRouter = Router();
const tasksController = require('../controllers/taskController');

tasksRouter.get('/', tasksController.getTasks);

module.exports = tasksRouter;
