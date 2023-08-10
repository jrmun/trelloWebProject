const { Comment } = require("../models");
const { Op } = require("sequelize");

class CommentsRepository {
    createComment = async ({ user_id, card_id, content }) => {
        console.log(card_id)
        return await Comment.create({user_id, card_id, content});
    };

    findAllComment = async () => {
        return await Comment.findAll();
    };

    findOneComment = async (comment_id) => {
        return await Comment.findOne({where: { comment_id: comment_id }});
    };

    updateComment = async ( user_id, card_id, comment_id, content ) => {
        return await Comment.update({content}, { where: { [Op.and]: [{ user_id:user_id }, { card_id:card_id },{comment_id:comment_id}] } });
    };

    deleteComment = async (user_id, card_id, comment_id) => {
        return await Comment.destroy({where: { [Op.and]: [{ user_id:user_id }, { card_id:card_id },{comment_id:comment_id}] } });
    };

}

module.exports = CommentsRepository;