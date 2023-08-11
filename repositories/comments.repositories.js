const { Comment, User } = require('../models');
const { Op } = require('sequelize');

class CommentsRepository {
    createComment = async ({ user_id, card_id, content }) => {
        return await Comment.create({ user_id, card_id, content });
    };

    findOneComment = async (comment_id) => {
        return await Comment.findOne({ where: { comment_id: comment_id } });
    };

    findAllComment = async ({ card_id }) => {
        return await Comment.findAll({
            where: { card_id: card_id },
            include: [{ model: User }],
        });
    };

    updateComment = async (comment_id, content) => {
        return await Comment.update({ content }, { where: { comment_id: comment_id } });
    };

    deleteComment = async (comment_id) => {
        return await Comment.destroy({ where: { comment_id: comment_id } });
    };
}

module.exports = CommentsRepository;
