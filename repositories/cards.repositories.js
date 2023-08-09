const { Card, CardInfo, User, sequelize } = require('../models');
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
        const cardList = await CardInfo.findAll();
        if (cardList) {
            const maxCardPosition = await CardInfo.max('position');
            const position = maxCardPosition + 1;
            return await sequelize.transaction(async (transaction) => {
                const cardCreate = await Card.create({ user_id, column_id }, { transaction });
                await CardInfo.create({ card_id: cardCreate.card_id, title, content, color, position, deadline }, { transaction });
            });
        } else {
            return await sequelize.transaction(async (transaction) => {
                const cardCreate = await Card.create({ user_id, column_id }, { transaction });
                await CardInfo.create({ card_id: cardCreate.card_id, title, content, color, deadline }, { transaction });
            });
        }
    };

    updateCard = async ({ card_id, title, content, color, deadline }) => {
        await CardInfo.update({ title, content, color, deadline }, { where: { card_id: card_id } });
    };

    movecolumn = async ({ card_id, column_id }) => {
        await Card.update({ column_id }, { where: { card_id: card_id } });
    };

    selectworker = async ({ card_id, user_id }) => {
        const user = await User.findOne({ where: { user_id: user_id } });
        await CardInfo.update({ worker: user.name }, { where: { card_id: card_id } });
    };

    moveposition = async ({ card_id, position }) => {
        const card = await CardInfo.findOne({ where: { position: position } });
        const newcard = await CardInfo.findOne({ where: { card_id: card_id } });
        if (card) {
            const cardPosition = newcard.position;
            await CardInfo.update({ position }, { where: { card_id: card_id } });
            return await CardInfo.update({ position: cardPosition }, { where: { card_id: card.card_id } });
        }
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
