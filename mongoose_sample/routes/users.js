const express = require('express');
const User = require('../schemas/user');
const Comment = require('../schemas/comment');

const router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.route('/')
  /**
   * GET
   */
  .get(async (req, res, next) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (_err) {
      console.error(_err);
      next(_err);
    }
  })
  /**
   * POST
   */
  .post(async (req, res, next) => {
    try {
      const user = await User.create({
        name: req.body.name, 
        age: req.body.age, 
        married: req.body.married
      });

      console.log('[users] create user:: ', user);
      res.status(201).json(user);
    } catch (_err) {
      console.log(_err);
      next(_err);
    }
  });


router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.find({ commenter: req.params.id }).populate('commenter');
    console.log('[users] comments:: ', comments);
    res.json(comments);
  } catch (_err) {
    console.log(_err);
    next(_err);
  }
});

module.exports = router;
