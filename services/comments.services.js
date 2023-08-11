const CommentsRepository = require('../repositories/comments.repositories');
const CardRepository = require('../repositories/cards.repositories');

class CommentsService {
    commentsRepository = new CommentsRepository();
    cardRepository = new CardRepository();

    createComments = async ({ user_id, card_id, content }) => {
        if (content === '') throw new Error('Content is empty');

        await this.commentsRepository.createComment({ user_id, card_id, content });
        return { code: 200, message: '댓글 작성이 완료되었습니다.' };
    };

    findOneComment = async ({ card_id }) => {
        try {
            const allComments = await this.commentsRepository.findOneComment({ card_id });
            const Comment = allComments.map((comment) => {
                return {
                    comment_id: comment.comment_id,
                    name: comment.User.name,
                    content: comment.content,
                };
            });
            return { code: 200, data: Comment };
        } catch (error) {
            console.log(error);
            throw { code: 403, message: '댓글 조회 실패하였습니다.' };
        }
    };

    updateComment = async (user_id, comment_id, content) => {
        // const findComment = await this.commentsRepository.findOneComment(comment_id);
        // if (!findComment) throw new Error('수정가능한 댓글이 존재하지 않습니다.');

        // const findCommentUser_id = findComment.user_id;
        // if (user_id !== findCommentUser_id) throw new Error('댓글수정은 댓글작성자만 가능합니다.');

        await this.commentsRepository.updateComment(comment_id, content);
    };

    deleteComment = async (user_id, comment_id) => {
        // const findCard = await this.cardRepository.cardFindOne(card_id);
        // if (!findCard) throw { code: 403, message: '게시글이 존재하지 않습니다.' };

        // const findComment = await this.commentsRepository.findOneComment(comment_id);
        // if (!findComment) throw { code: 403, message: '삭제가능한 댓글이 존재하지 않습니다.' };

        // const findCommentUser_id = findComment.User_id;
        // if (user_id !== findCommentUser_id) throw { code: 403, message: '댓글삭제는 댓글작성자만 가능합니다.' };

        await this.commentsRepository.deleteComment(comment_id);
        return { code: 200, message: '댓글삭제가 완료되었습니다.' };
    };
}

module.exports = CommentsService;
