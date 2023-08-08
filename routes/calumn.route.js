const express = reqire('express');
const router = express.Router();

const ColumnController = require('../controllers/posts.controller');
const columnController = new ColumnController();

router.get('/board/board_id/column', columnController.getColumn);
router.post('/board/board_id/column', columnController.createColumn);
router.update('/board/board_id/column/column_id', columnController.updateColumn);
router.delete('/board/board_id/column/column_id', columnController.deleteColumn);

module.exports = router;
