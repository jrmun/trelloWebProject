const BoardRepository = require('../repositories/boards.repository');

class BoardService {
    boardRepository = new BoardRepository();

    createBoard = async (user, board_name, bg_color, description) => {
        const createBoardData = await this.boardRepository.createBoard(user.user_id, board_name, bg_color, description);

        return createBoardData;
    };

    findAllBoardsById = async (user) => {
        const allBoards = await this.boardRepository.findAllBoardsById(user.user_id);

        allBoards.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        return allBoards.map((board) => {
            return {
                board_name: board.board_name,
                description: board.description,
                createdAt: board.createdAt,
                updatedAt: board.updatedAt,
            };
        });
    };

    getBoardById = async (boardId) => {
        const findBoard = await this.boardRepository.findBoardById(boardId);

        return findBoard;
    };

    updateBoard = async (user, boardId, board_name, bg_color, description) => {
        const findBoard = await this.boardRepository.findBoardById(boardId);

        if (!findBoard) throw new Error("Board doesn't exist");

        await this.boardRepository.updateBoard(user, boardId, board_name, bg_color, description);

        const updateBoard = await this.boardRepository.findBoardById(boardId);

        return updateBoard;
    };

    deleteBoard = async (user, boardId) => {
        const findBoard = await this.boardRepository.findBoardById(boardId);
        if (!findBoard) throw new Error("Board doesn't exist");

        await this.boardRepository.deleteBoard(user, boardId);

        return true;
    };

    inviteBoard = async (boardId, email) => {
        const invitedUser = await this.userRepository.findUserByEmail(email);
        if (!invitedUser) throw new Error("User doesn't exist");

        const board = await this.boardRepository.findBoardById(boardId);
        if (!board) throw new Error("Board doesn't exist");

        const inviteBoardData = await this.boardRepository.createBoardUser(invitedUser.userId, board.board_id);

        return inviteBoardData;
    };
}

module.exports = BoardService;
