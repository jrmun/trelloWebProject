const ColumnRepository = require('../repositories/columns.repositories');
const { CustomError, ServiceReturn } = require('../customClass');

class ColumnService {
    columnRepository = new ColumnRepository();

    getColumnList = async (board_id) => {
        const columnList = await this.columnRepository.columnFindAll(board_id);
        return new ServiceReturn('컬럼 리스트를 가져오는데 성공했습니다.', 200, columnList);
    };

    createColumn = async ({ board_id, user_id, column_name }) => {
        await this.columnRepository.createColumn({ board_id, user_id, column_name });

        return new ServiceReturn('컬럼 등록이 완료되었습니다.', 200);
    };

    updateColumn = async ({ column_id, name }) => {
        const findColumn = await this.columnRepository.columnFindOne(column_id);
        if (!findColumn) throw new CustomError('존재하지 않는 컬럼입니다.', 403);
        if (user_id === findColumn.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.columnRepository.updateColumn({ column_id, name });
        return new ServiceReturn('컬럼 수정이 완료되었습니다.', 200);
    };

    deleteColumn = async (column_id) => {
        const findColumn = await this.columnRepository.columnFindOne(column_id);
        if (!findColumn) throw new CustomError('존재하지 않는 컬럼입니다.', 403);
        if (user_id === findColumn.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.columnRepository.deleteColumn(column_id);
        return new ServiceReturn('컬럼 삭제가 완료되었습니다.', 200);
    };

    moveColumn = async ({ column_id, position }) => {
        const findColumn = await this.columnRepository.columnFindOne(column_id);
        if (!findColumn) throw new CustomError('존재하지 않는 컬럼입니다.', 403);
        if (user_id === findColumn.user_id) throw new CustomError('작성한 사용자가 아닙니다.', 403);

        await this.columnRepository.moveColumn({ column_id, position });
        return new ServiceReturn('컬럼 이동이 완료되었습니다.', 200);
    };
}

module.exports = ColumnService;
