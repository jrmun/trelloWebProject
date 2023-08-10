const BoardRepository = require('../repositories/boards.repository');

class BoardService {
    boardRepository = new BoardRepository();

    createBoard = async (user, board_name, bg_color, description) => {
        const createBoardData = await this.boardRepository.createBoard(user.user_id, board_name, bg_color, description);
        return createBoardData;
    };

    findAllBoardsById = async (user) => {
        const allBoards = await this.boardRepository.findAllBoardsById(user.user_id);
        if (!allBoards) throw new Error("Boards doen't exist");
        return allBoards;
    };

    getBoardById = async (boardId) => {
        const findBoard = await this.boardRepository.findBoardById(boardId);
        if (!findBoard) throw new Error("Board doesn't exist");
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
        const invitedUser = await this.boardRepository.findUserByEmail(email);
        if (!invitedUser) throw new Error("User doesn't exist");

        const board = await this.boardRepository.findBoardById(boardId);
        if (!board) throw new Error("Board doesn't exist");

        const inviteBoardData = await this.boardRepository.createBoardUser(invitedUser.user_id, board.board_id);
        return inviteBoardData;
    };

    getBoadUsers = async (boardId) => {
        const getBoadUsers = await this.boardRepository.getBoadUsers(boardId);
        if (!getBoadUsers) throw new Error("getBoadUsers don't exist");
        return getBoadUsers;
    };
}

module.exports = BoardService;
