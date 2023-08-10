const { Comment } = require("../models");
// const { Op } = require("sequelize");

class CommentsRepository {
    createComments = async (comment) => {
        const createCommentData = await Comment.create({comment});
        return createCommentData;
    };

    findAllComments = async ({ card_id }) => {
        return await Comment.findAllComment({card_id});
    };

    updateComments = async ({ user_id, card_id, comment_id, comment }) => {
        return await Comment.update({comment}, {where: {user_id, card_id, comment_id}});
    };

    deleteComments = async ({ user_id, card_id, comment_id }) => {
        return await Comment.delete({where: { user_id, card_id, comment_id }}); 
    };

}

module.exports = CommentsRepository;