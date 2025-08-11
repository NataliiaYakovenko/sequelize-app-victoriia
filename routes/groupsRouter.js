const { Router } = require('express');
const groupController = require('../controllers/groupController');

const groupRouter = Router();

groupRouter.post('/', groupController.createGroup);

module.exports = groupRouter;
