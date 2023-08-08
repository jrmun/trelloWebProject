const express = require('express');
const router = express.Router();

const CardController = require('../controllers/cards.controllers');
const cardController = new CardController();
//column_id에 해당하는 모든 카드 간략 정보
router.get('/columns/:column_id/cards', cardController.getCardList);
//card_id에 해당하는 상세 카드정보
router.get('/cards/:card_id', cardController.getCard);
//column_id에 카드 생성
router.post('/columns/:column_id/cards', cardController.createCard);
//card 수정
router.put('/cards/:card_id', cardController.updateCard);
//card column이동
router.put('/cards/:card_id/movecolumn', cardController.moveCardColumn);
//card 담당자 선택
router.put('/cards/:card_id/selectworker', cardController.selectWorker);
//card 위치 변경
router.put('/cards/:card_id/moveposition', cardController.moveCardPosition);
//card 삭제
router.delete('/cards/:card_id', cardController.deleteCard);

module.exports = router;
