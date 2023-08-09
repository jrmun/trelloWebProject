const express = require('express');
const router = express.Router();

const CommentsController = require('../controllers/comments.controllers');
const commentsController = new CommentsController();

const auth = require('../middlewares/auth');

router.post('/card/card_id/comments', auth, commentsController.createComments);
router.get('/card/card_id/comments', auth, commentsController.getComments);
//router.get('/card/card_id/comments/:commentId', auth, CommentsController.getCommentById);
router.put('/card/card_id/comments/:commentsId', auth, commentsController.updateComments);
router.delete('/card/card_id/comments/:commentsId', auth, commentsController.deleteComments);

module.exports = router;