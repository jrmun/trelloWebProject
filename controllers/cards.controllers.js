const CardService = require('../services/cards.services');

class CardController {
    cardService = new CardService();

    //해당 column에 대한 모든 카드 리스트
    getCardList = async (req, res, next) => {
        try {
            const column_id = req.params;
            const { status, message, result } = await this.cardService.getCardList(column_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 Id에 관한 카드 상세 정보
    getCard = async (req, res, next) => {
        try {
            const { card_id } = req.params;
            const { status, message, result } = await this.cardService.getCard(card_id);
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 생성
    createCard = async (req, res, next) => {
        try {
            const { title, content, color, deadline } = req.body;
            const { column_id } = req.params;
            const user_id = res.locals.user.user_id;
            const { status, message, result } = await this.cardService.createCard({ user_id, column_id, title, content, color, deadline });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 상세 정보 변경
    updateCard = async (req, res, next) => {
        try {
            const { title, content, color, deadline } = req.body;
            const { card_id } = req.params;
            const user_id = res.locals.user.user_id;
            const { status, message, result } = await this.cardService.updateCard({
                user_id,
                card_id,
                title,
                content,
                color,
                deadline,
            });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 column 이동
    moveCardColumn = async (req, res, next) => {
        try {
            const user_id = res.locals.user.user_id;
            const { card_id } = req.params;
            const { column_name, board_id } = req.body;

            const { status, message, result } = await this.cardService.movecolumn({ column_name, card_id, board_id, user_id });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //담당자 설정
    selectWorker = async (req, res, next) => {
        try {
            const user_id = res.locals.user.user_id;
            const { card_id } = req.params;
            const { status, message, result } = await this.cardService.selectworker({ user_id, card_id });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 위치 설정
    moveCardPosition = async (req, res, next) => {
        try {
            const { card_id } = req.params;
            const { position } = req.body;
            const { status, message, result } = await this.cardService.moveposition({ card_id, position });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    //카드 삭제
    deleteCard = async (req, res, next) => {
        try {
            const user_id = res.locals.user.user_id;
            const { column_id, card_id } = req.params;
            const { status, message, result } = await this.cardService.deleteCard({ user_id, column_id, card_id });
            return res.status(status).json({ status, message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}
module.exports = CardController;
