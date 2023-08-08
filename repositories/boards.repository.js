const { Board } = require('../models');
const { BoardUser } = require('../models');
const { Op } = require('sequelize');

class BoardRepository {
    createBoard = async (user_id, board_name, bg_color, description) => {
        const createBoardData = await Board.create({
            user_id,
            board_name,
            bg_color,
            description,
        });
        return createBoardData;
    };

    findAllBoardsById = async (user_id) => {
        const allBoards = await Board.findAll({ where: { user_id } });

        return allBoards;
    };

    findBoardById = async (boardId) => {
        const board = await Board.findByPk(boardId);

        return board;
    };

    updateBoard = async (user, boardId, board_name, bg_color, description) => {
        const updateBoardData = await Board.update(
            { board_name, bg_color, description },
            { where: { [Op.and]: [{ user_id: user.user_id }, { board_id: boardId }] } }
        );

        return updateBoardData;
    };

    deleteBoard = async (user, boardId) => {
        const updateBoardData = await Board.destroy({
            where: { [Op.and]: [{ user_id: user.user_id }, { board_id: boardId }] },
        });

        return updateBoardData;
    };

    createBoardUser = async (user_id, board_id) => {
        await BoardUser.create({ user_id, board_id });
    };
}

module.exports = BoardRepository;
