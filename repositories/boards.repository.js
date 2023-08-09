const { Board } = require('../models');
const { BoardUser } = require('../models');
const { User } = require('../models');
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
        const allBoards = await Board.findAll({ where: { user_id: user_id } });

        return allBoards;
    };

    findBoardById = async (boardId) => {
        const board = await Board.findOne({ where: { board_id: boardId } });

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

    findUserByEmail = async (email) => {
        const user = await User.findOne({ where: { email } });
        return user;
    };

    createBoardUser = async (user_id, board_id) => {
        const boardUser = await BoardUser.create({ user_id, board_id });
        return boardUser;
    };

    getBoadUsers = async (boardId) => {
        const BoadUsers = await BoardUser.findAll({
            where: { board_id: boardId },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });
        return BoadUsers;
    };
}

module.exports = BoardRepository;
