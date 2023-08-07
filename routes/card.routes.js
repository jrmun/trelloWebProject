const express = require('express');
const router = express.Router();

const CardController = require('../controllers/cards.controllers');
const cardController = new CardController();

router.get('/columns/:column_id/cards', cardController.getCardList);
router.get('/columns/:column_id/cards/:card_id', cardController.getCard);
router.post('/columns/:column_id/cards', cardController.createCard);
router.put('/columns/:column_id/cards/:card_id', cardController.updateCard);
router.put('/columns/:column_id/cards/:card_id/movecolumn', cardController.moveCardColumn);
router.put('/columns/:column_id/cards/:card_id/selectworker', cardController.selectWorker);
router.put('/columns/:column_id/cards/:card_id/moveposition', cardController.moveCardPosition);
router.delete('/columns/:column_id/cards/:card_id', cardController.deleteCard);

module.exports = router;