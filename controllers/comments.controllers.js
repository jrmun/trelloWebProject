const CommentsService = require('../services/comments.services');

class CommentsController {
    commentsService = new CommentsService();

    createComments = async (req, res, next) => {
        try {
            const user_id = res.locals.user;
            const { card_id } = req.params;
            const { comment } = req.body;
            const createCommentData = await this.CommentsService.createComments({user_id, comment, card_id});

            res.status(200).json({ data: createCommentData });
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error.message);
        }
    };
    
    getComments = async (req, res, next) => {
        try {
            const { card_id } = req.params;
            const comments = await this.commentsService.findAllComment({ card_id });
    
            res.status(200).json({ data: comments });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    updateComments = async (req, res, next) => {
        try {
            const user_id = res.locals.user;
            const card_id = res.locals.card;
            const { comment_id } = req.params;
            const { comment } = req.body;
    
            const updateComment = await this.commentsService.updateComment(
                user_id,
                card_id,
                comment_id,
                comment
            );
    
            res.status(200).json({ data: updateComment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    deleteComments = async (req, res, next) => {
        try {
            const { comment_id } = req.params;
            const user_id = res.locals.user;
            const card_id = res.locals.card;
    
            const deleteComment = await this.commentsService.deleteComment(
                user_id,
                comment_id,
                card_id
            );
    
            res.status(200).json({ message: "댓글 삭제 성공." });
        }catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}
module.exports = CommentsController;
