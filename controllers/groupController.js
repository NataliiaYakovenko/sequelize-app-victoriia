const { Group } = require('../models/Group');

module.exports.createGroup = async (req, res, next) => {
  try {
    const { body } = req;
    const createdGroup = await Group.create(body);

    if (!createdGroup) {
      return res.status(400).send('Something wrong');
    }
    res.status(201).send(createdGroup);
  } catch (err) {
    next(err);
  }
};
