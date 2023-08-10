const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

const ColumnController = require('../controllers/calumn.controller');
const columnController = new ColumnController();

router.get('/board/:board_id/column', auth, columnController.getColumn);
router.post('/board/:board_id/column', auth, columnController.createColumn);
router.put('/column/:column_id', auth, columnController.updateColumn);
router.delete('/board/:board_id/column/:column_id', auth, columnController.deleteColumn);

module.exports = router;
