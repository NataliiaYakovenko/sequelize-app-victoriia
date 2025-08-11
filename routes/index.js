const { Router } = require('express');
const userRouter = require('./usersRouter');
const groupRouter = require('./groupsRouter')

const router = Router();

router.use('/users', userRouter);
router.use('/groups', groupRouter);

module.exports = router;
