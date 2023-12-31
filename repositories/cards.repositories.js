const { Card, CardInfo, User, sequelize, Column } = require('../models');
const { Op } = require('sequelize');

class CardRepository {
    cardFindOne = async (card_id) => {
        return await Card.findOne({
            where: { card_id: card_id },
            include: [{ model: CardInfo }, { model: User }],
        });
    };

    cardFindAll = async (column_id) => {
        return await Card.findAll({
            where: { column_id: column_id.column_id },
            include: [{ model: CardInfo }, { model: User }],
            order: [[{ model: CardInfo }, 'position', 'DESC']],
        });
    };

    createCard = async ({ user_id, column_id, title, content, color, deadline }) => {
        return await sequelize.transaction(async (transaction) => {
            const cardCreate = await Card.create({ user_id, column_id }, { transaction });
            await CardInfo.create({ card_id: cardCreate.card_id, title, content, position: 1, color, deadline }, { transaction });
        });
    };

    updateCard = async ({ card_id, title, content, color, deadline }) => {
        await CardInfo.update({ title, content, color, deadline }, { where: { card_id: card_id } });
    };

    movecolumn = async ({ column_name, card_id, board_id }) => {
        const column = await Column.findOne({ where: { [Op.and]: [{ column_name: column_name }, { board_id: board_id }] } });
        await Card.update({ column_id: column.column_id }, { where: { card_id: card_id } });
    };

    selectworker = async ({ card_id, user_id }) => {
        const user = await User.findOne({ where: { user_id: user_id } });
        await CardInfo.update({ worker: user.name }, { where: { card_id: card_id } });
    };

    moveposition = async ({ card_id, position }) => {
        return await CardInfo.update({ position }, { where: { card_id: card_id } });
    };

    deleteCard = async (card_id) => {
        await sequelize.transaction(async (transaction) => {
            await Card.destroy({ where: { card_id: card_id } }, { transaction });
            await CardInfo.destroy({ where: { card_id: card_id } }, { transaction });
        });
    };
}

module.exports = CardRepository;
