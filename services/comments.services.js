const CommentsRepository = require('../repositories/comments.repositories');

class CommentsService {
    CommentsRepository = new CommentsRepository();

    createComments = async (comment) => {
        if (!comment) throw new Error('댓글을 작성해주세요')
        const findComment = await this.CommentRepository.createComments(comment);
        // if (!findComment) throw { code: 403, message: '게시글이 존재하지 않습니다.'};

        
        return findComment;
    };

    findAllComment = async ({ card_id }) => {
        try {
            const allComments = await this.commentsRepository.findAllComments({card_id});
            return { code: 200, data: allComments };
        } catch (error) {
            throw { code: 403, message: '댓글 조회 실패하였습니다.' };
        }
    };

    updateComment = async ({ user_id, card_id, comment_id, comment }) => {
        const findCard = await this.cardRepository.findOne({ card_id });
        if (!findCard) throw { code: 403, message: '게시글이 존재하지 않습니다.' };
    
        const findComment = await this.commentsRepository.findOne({ comment_id });
        if (!findComment) throw { code: 403, message: '수정가능한 댓글이 존재하지 않습니다.' };
    
        const findCommentUser_id = findComment.User_id;
        if (user_id !== findCommentUser_id)
        throw { code: 403, message: '댓글수정은 댓글작성자만 가능합니다.' };
    
        await this.commentsRepository.updateOne({ comment }, [
            { User_id: user_id },
            { Card_id: card_id },
        ]);
        return { code: 200, message: '댓글수정이 완료되었습니다.' };
    };

    deleteComment = async ({ user_id, card_id, comment_id }) => {
        const findCard = await this.cardRepository.findOne({ card_id });
        if (!findCard) throw { code: 403, message: '게시글이 존재하지 않습니다.' };
    
        const findComment = await this.commentsRepository.findOne({ comment_id });
        if (!findComment) throw { code: 403, message: '삭제가능한 댓글이 존재하지 않습니다.' };
    
        const findCommentUser_id = findComment.User_id;
        if (user_id !== findCommentUser_id)
            throw { code: 403, message: '댓글삭제는 댓글작성자만 가능합니다.' };
        
        await this.commentsRepository.deleteOne({ comment_id })
        return  { code: 200, message: '댓글삭제가 완료되었습니다.' };
    };
}

module.exports = CommentsService;