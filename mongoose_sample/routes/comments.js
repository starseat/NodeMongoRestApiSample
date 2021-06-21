const express = require('express');
const Comment = require('../schemas/comment');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id, 
            comment: req.body.comment
        });

        console.log('[comments] comment: ', comment);
        const result = await Comment.populate(comment, { path: 'commenter' });
        res.status(201).json(result);
    } catch (_err) {
        console.log(_err);
        next(_err);
    }
});

router.route('/:id')
    /**
     * get
     */
    .get(async (req, res, next) => {
        try {
            const comments = await Comment.find({
                commenter: req.params.id
            }).populate('commenter');

            console.log('[comments] get comments: ', comments);
            res.json(comments);
        } catch (_err) {
            console.error(_err);
            next(_err);
        }
    })
    /**
     * patch
     */
    .patch(async (req, res, next) => {
        try {
            const result = await Comment.update({
                _id: req.params.id
            }, {
                comment: req.body.comment
            });

            res.json(result);
        } catch(_err) {
            console.error(_err);
            next(_err);
        }
    })
    /**
     * delete
     */
    .delete(async (req, res, next) => {
        try {
            const result = await Comment.remove({ _id: req.params.id });
            res.json(result);
        } catch(_err) {
            console.error(_err);
            next(_err);
        }
    });

module.exports = router;