const express = require('express');
const router = express.Router();

const ColumnController = require('../controllers/columns.controllers');
const columnController = new ColumnController();

const auth = require('../middlewares/auth');

//컬럼 리스트 받아오기
router.get('/boards/:board_id/columns', columnController.getColumnList);
//컬럼 생성
router.post('/boards/:board_id/columns', auth, columnController.createColumn);
//컬럼의 이름 수정
router.put('/columns/:column_id', auth, columnController.updateColumn);
//컬럼 삭제
router.delete('/columns/:column_id', auth, columnController.deleteColumn);
//컬럼 순서 이동
router.put('/columns/:column_id', columnController.moveColumn);

module.exports = router;
