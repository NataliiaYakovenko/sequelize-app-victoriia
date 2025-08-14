const { Router } = require('express');
const userRouter = require('./usersRouter');
const groupRouter = require('./groupsRouter');
const tasksRouter = require('./tasksRouter');

const router = Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);
router.use('/tasks', tasksRouter);

module.exports = router;
