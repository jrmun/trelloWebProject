const CardService = require('../services/cards.services');

class CardController {
    cardService = new CardService();

    getCardList = async () => {
        try {
            const column_id = req.param;
            const { status, message, result } = await this.cardService.getCardList(column_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    getCard = async () => {
        try {
            const { column_id, card_id } = req.param;
            const { status, message, result } = await this.cardService.getCard({ column_id, card_id });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    createCard = async () => {
        try {
            const { title, content, color, worker, deadline } = req.body;
            const column_id = req.param;
            const { user_id } = res.locals.user;
            const { status, message, result } = await this.cardService.createCard({ user_id, column_id, title, content, color, worker, deadline });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    updateCard = async () => {
        try {
            const { title, content, color, worker, deadline } = req.body;
            const { column_id, card_id } = req.param;
            const { user_id } = res.locals.user;
            const { status, message, result } = await this.cardService.updateCard({
                user_id,
                column_id,
                card_id,
                title,
                content,
                color,
                worker,
                deadline,
            });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    deleteCard = async () => {
        try {
            const { user_id } = res.locals.user;
            const { column_id, card_id } = req.param;
            const { status, message, result } = await this.cardService.deleteCard({ user_id, column_id, card_id });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}
module.exports = CardController;
