const ColumnRepository = require('../repositories/calumn.repository');

class ColumnService {
    columnRepository = new ColumnRepository();

    getColumn = async () => {
        const getColumnData = await this.columnRepository.findAllColumn({
            order: [['createAt', 'DESC']],
        });
        return getColumnData;
    };

    createColumn = async ({ column_name, board_id, user_id }) => {
        const columnData = await this.columnRepository.createColumn({ column_name, board_id, user_id });

        return columnData;
    };

    updateColumn = async (column_id, column_name, board_id, user_id) => {
        const findColumn = await this.columnRepository.findColumnById(column_id);
        if (!findColumn) throw new Error("Column doesn't exit");

        await this.columnRepository.updateColumn(column_id, column_name, board_id, user_id);

        const updateColumn = await this.columnRepository.findColumnById(column_id);

        return updateColumn;
    };
}
module.exports = ColumnService;
