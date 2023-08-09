const { comments } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {
    createComment = async ({ user_id, card_id, comment }) => {
        return await Comment.create({user_id, card_id, comment});
    };

    findAllComment = async ({ card_id }) => {
        return await Comment.findAllComment({card_id});
    };

    updateComment = async ({ user_id, card_id, comment_id, comment }) => {
        return await Comment.update({comment}, {where: {user_id, card_id, comment_id}});
    };

    deleteComment = async ({ user_id, card_id, comment_id }) => {
        return await Comment.delete({where: { user_id, card_id, comment_id }}); 
    };

}

module.exports = CommentsRepository;