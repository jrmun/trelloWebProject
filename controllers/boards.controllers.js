const { emit } = require('nodemon');
const BoardService = require('../services/boards.service');

class BoardsController {
    boardService = new BoardService();

    createBoard = async (req, res, next) => {
        const user = res.locals.user;
        const { board_name, bg_color, description } = req.body;
        try {
            const createBoardData = await this.boardService.createBoard(user, board_name, bg_color, description);
            res.status(201).json({ data: createBoardData });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.log(error.message);
        }
    };

    getBoards = async (req, res, next) => {
        const user = res.locals.user;
        try {
            const boards = await this.boardService.findAllBoardsById(user);
            res.status(200).json({ data: boards });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.log(error.message);
        }
    };

    getBoardById = async (req, res, next) => {
        const { boardId } = req.params;
        try {
            const board = await this.boardService.getBoardById(boardId);
            res.status(200).json({ data: board });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.log(error.message);
        }
    };

    updateBoard = async (req, res, next) => {
        const user = res.locals.user;
        const { boardId } = req.params;
        const { board_name, bg_color, description } = req.body;
        console.log(board_name);

        try {
            const updateBoard = await this.boardService.updateBoard(user, boardId, board_name, bg_color, description);
            res.status(200).json({ data: updateBoard });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.log(error.message);
        }
    };

    deleteBoard = async (req, res, next) => {
        const { boardId } = req.params;
        const user = res.locals.user;
        try {
            const deleteBoard = await this.boardService.deleteBoard(user, boardId);
            res.status(200).json({ message: '보드 삭제 성공.' });
        } catch (error) {
            res.status(401).json({ message: error.message });
            console.log(error.message);
        }
    };

    inviteBoard = async (req, res, next) => {
        const { boardId } = req.params;
        const { email } = req.body;

        try {
            const inviteBoard = await this.boardService.inviteBoard(boardId, email);
            res.status(200).json({ message: '유저 초대 성공.' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };

    getBoadUsers = async (req, res, next) => {
        const { boardId } = req.params;
        try {
            const BoadUsers = await this.boardService.getBoadUsers(boardId);
            res.status(201).json({ data: BoadUsers });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    };
}

module.exports = BoardsController;
