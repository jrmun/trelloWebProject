const CardRepository = require('../repositories/cards.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class CardService {
    cardRepository = new CardRepository();

    getCard = async ({ column_id, card_id }) => {
        const findCardId = await this.cardRepository.cardFindOne({ column_id, card_id });
        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);

        const Card = {
            card_id: findCardId.card_id,
            name: findCardId.User.name,
            title: findCardId.CardInfo.title,
            content: findCardId.CardInfo.content,
            color: findCardId.CardInfo.color,
            worker: findCardId.CardInfo.worker,
            deadline: findCardId.CardInfo.deadline,
        };
        return new ServiceReturn('카드 정보를 정상적으로 불러왔습니다.', 200, Card);
    };

    getCardList = async (column_id) => {
        const findCardList = await this.cardRepository.cardFindAll(column_id);

        const cardList = findCardList.map((card) => {
            return {
                name: card.User.name,
                title: card.CardInfo.title,
                worker: card.CardInfo.worker,
            };
        });
        return new ServiceReturn('카드 리스트를 성공적으로 불러왔습니다.', 200, cardList);
    };

    createCard = async ({ user_id, column_id, title, content, color, worker, deadline }) => {
        await this.cardRepository.createCard({ user_id, column_id, title, content, color, worker, deadline });

        return new ServiceReturn('카드 등록이 정상적으로 완료되었습니다.', 200);
    };

    updateCard = async ({ user_id, column_id, card_id, title, content, color, worker, deadline }) => {
        const findCardId = await this.cardRepository.cardFindOne({
            column_id,
            card_id,
        });
        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);

        if (user_id === findCardId.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.cardRepository.updateCard({ card_id, title, content, color, worker, deadline });

        return new ServiceReturn('카드 정보 수정이 정상적으로 완료되었습니다.', 200);
    };

    deleteCard = async ({ user_id, column_id, card_id }) => {
        const findCardId = await this.cardRepository.cardFindOne({ column_id, card_id });
        if (!findCardId) throw new CustomError('해당하는 카드 정보는 존재하지 않습니다.', 403);

        if (user_id === findCardId.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.cardRepository.deleteCard(card_id);
        return new ServiceReturn('카드 삭제가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = CardService;