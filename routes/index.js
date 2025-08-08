const { Router } = require('express');
const userRouter = require('./usersRouter');

const router = Router();

router.use('/users', userRouter);

module.exports = router;
