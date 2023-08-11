const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controllers');
const commentsController = new CommentsController();

const auth = require('../middlewares/auth');

router.post('/card/:card_id/comments', auth, commentsController.createComments);
router.get('/card/:card_id/comments', auth, commentsController.getComment);
//router.get('/card/card_id/comments/:commentId', auth, CommentsController.getCommentById);
router.put('/comments/:comment_id', auth, commentsController.updateComments);
router.delete('/comments/:comment_id', auth, commentsController.deleteComments);

module.exports = router;
