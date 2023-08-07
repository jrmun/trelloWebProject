const { Column } = require('../models');

class ColumnRepository {
    createColumn = async (column_name, board_id, user_id) => {
        const calumnData = await Column.create({
            column_name,
            board_id,
            user_id,
        });
        return calumnData;
    };

    findAllColumn = async () => {
        const column = await Column.findAll();

        return column;
    };

    updateColumn = async (column_name, board_id, user_id) => {
        const columnData = await Column.update({ column_name }, { where: { board_id, user_id } });
        return columnData;
    };

    deleteColumn = async (board_id, user_id) => {
        const columnData = await Column.destroy({ where: { board_id, user_id } });
        return columnData;
    };
}
module.exports = ColumnRepository;
