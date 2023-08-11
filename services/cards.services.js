const CardRepository = require('../repositories/cards.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class CardService {
    cardRepository = new CardRepository();

    getCard = async (card_id) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);
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
                card_id: card.card_id,
                name: card.User.name,
                title: card.CardInfo.title,
                worker: card.CardInfo.worker,
                color: card.CardInfo.color,
                position: card.CardInfo.position,
                deadline: card.CardInfo.deadline,
            };
        });
        return new ServiceReturn('카드 리스트를 성공적으로 불러왔습니다.', 200, cardList);
    };

    createCard = async ({ user_id, column_id, title, content, color, deadline }) => {
        await this.cardRepository.createCard({ user_id, column_id, title, content, color, deadline });

        return new ServiceReturn('카드 등록이 정상적으로 완료되었습니다.', 200);
    };

    updateCard = async ({ user_id, card_id, title, content, color, deadline }) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);

        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);
        if (!user_id === findCardId.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        if (!title) throw new CustomError('제목을 작성해주세요.', 403);
        if (!content) throw new CustomError('내용을 작성해주세요.', 403);
        if (!color) throw new CustomError('색을 지정해주세요.', 403);
        if (!deadline) throw new CustomError('마감일을 설정해주세요.', 403);

        await this.cardRepository.updateCard({ card_id, title, content, color, deadline });

        return new ServiceReturn('카드 정보 수정이 정상적으로 완료되었습니다.', 200);
    };

    movecolumn = async ({ column_name, card_id, board_id, user_id }) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);
        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);

        if (!user_id === findCardId.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.cardRepository.movecolumn({ column_name, card_id, board_id });
        return new ServiceReturn('카드의 컬럼 이동이 완료되었습니다.', 200);
    };

    selectworker = async ({ user_id, card_id }) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);
        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);

        await this.cardRepository.selectworker({ user_id, card_id });
        return new ServiceReturn('해당 카드의 담당으로 설정이 완료되었습니다.', 200);
    };

    moveposition = async ({ card_id, position }) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);
        if (!findCardId) throw new CustomError('해당하는 카드는 존재하지 않습니다.', 403);

        await this.cardRepository.moveposition({ card_id, position });
        return new ServiceReturn('해당 카드의 중요도를 재설정했습니다.', 200);
    };

    deleteCard = async ({ user_id, card_id }) => {
        const findCardId = await this.cardRepository.cardFindOne(card_id);
        if (!findCardId) throw new CustomError('해당하는 카드 정보는 존재하지 않습니다.', 403);

        if (!user_id === findCardId.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.cardRepository.deleteCard(card_id);
        return new ServiceReturn('카드 삭제가 정상적으로 완료되었습니다.', 200);
    };
}

module.exports = CardService;
