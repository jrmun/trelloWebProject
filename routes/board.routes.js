const express = require('express');
const router = express.Router();

const BoardsController = require('../controllers/boards.controllers');
const boardsController = new BoardsController();

const auth = require('../middlewares/auth');

router.post('/board', auth, boardsController.createBoard);
router.get('/board', auth, boardsController.getBoards);
router.get('/board/:boardId', auth, boardsController.getBoardById);
router.put('/board/:boardId', auth, boardsController.updateBoard);
router.delete('/board/:boardId', auth, boardsController.deleteBoard);

router.post('/board/:boardId/invite', auth, boardsController.inviteBoard);
router.get('/board/:boardId/invite', auth, boardsController.getBoadUsers);
router.get('/boards/invited', auth, boardsController.getInvitedBoards);

module.exports = router;
