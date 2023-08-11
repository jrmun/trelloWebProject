const CommentsService = require('../services/comments.services');

class CommentsController {
    commentsService = new CommentsService();

    createComments = async (req, res, next) => {
        try {
            const { user_id } = res.locals.user;
            const { card_id } = req.params;
            const { content } = req.body;
            const createCommentData = await this.commentsService.createComments({ user_id, card_id, content });
            res.status(200).json({ data: createCommentData });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    getComment = async (req, res, next) => {
        try {
            const { card_id } = req.params;
            const { data } = await this.commentsService.findAllComment({ card_id });
            res.status(200).json({ data: data });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    updateComments = async (req, res, next) => {
        try {
            const { user_id } = res.locals.user;
            const { comment_id } = req.params;
            const { content } = req.body;
            const updateComment = await this.commentsService.updateComment(user_id, comment_id, content);

            res.status(200).json({ data: updateComment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteComments = async (req, res, next) => {
        try {
            const { comment_id } = req.params;
            const { user_id } = res.locals.user;
            await this.commentsService.deleteComment(user_id, comment_id);

            res.status(200).json({ message: '댓글 삭제 성공.' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
module.exports = CommentsController;
