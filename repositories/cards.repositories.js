const { Card, CardInfo, User, sequelize } = require('../models');
const { Op } = require('sequelize');

class CardRepository {
    cardFindOne = async ({ column_id, card_id }) => {
        return await Card.findOne({
            where: {
                [Op.and]: [{ column_id: column_id }, { card_id: card_id }],
            },
            include: { model: CardInfo, User },
        });
    };

    cardFindAll = async (column_id) => {
        return await Card.findAll({
            where: { column_id: column_id },
            include: { model: CardInfo, User },
        });
    };

    createCard = async ({ user_id, column_id, title, content, color, worker, deadline }) => {
        await sequelize.transaction(async (transaction) => {
            const cardCreate = await Card.create({ user_id, column_id }, { transaction });
            await CardInfo.create({ card_id: cardCreate.card_id, title, content, color, worker, deadline }, { transaction });
        });
    };

    updateCard = async ({ card_id, title, content, color, worker, deadline }) => {
        await CardInfo.update({ title, content, color, worker, deadline }, { where: { card_id: card_id } });
    };

    deleteCard = async (card_id) => {
        await sequelize.transaction(async (transaction) => {
            await Card.delete({ card_id: card_id }, { transaction });
            await CardInfo.delete({ card_id: card_id }, { transaction });
        });
    };
}

module.exports = CardRepository;
