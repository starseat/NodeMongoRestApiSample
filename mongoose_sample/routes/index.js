const express = require('express');
const User = require('../schemas/user');

const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find({});
    res.render('mongoose', { users });
  } catch (_err) {
    console.log(_err);
    next(_err);
  }
});

module.exports = router;
