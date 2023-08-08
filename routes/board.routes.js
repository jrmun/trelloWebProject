const express = require('express');
const router = express.Router();

const BoardsController = require('../controllers/boards.controllers');
const boardsController = new BoardsController();

const auth = require('../middlewares/auth');

router.post('/board', auth, boardsController.createBoard);
router.get('/board', boardsController.getBoards);
router.get('/board/:boardId', boardsController.getBoardById);
router.put('/board/:boardId', auth, boardsController.updateBoard);
router.delete('/board/:boardId', auth, boardsController.deleteBoard);

router.post('/board/:boardId/invite', boardsController.inviteBoard);

module.exports = router;
