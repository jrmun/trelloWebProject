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
    findColumnById = async (column_id) => {
        const column = await Column.findByPk(column_id);
        return column;
    };

    updateColumn = async (column_id, column_name, board_id, user_id) => {
        const columnData = await Column.update({ column_name }, { where: { column_id, board_id, user_id } });
        return columnData;
    };

    deleteColumn = async (board_id, user_id) => {
        const columnData = await Column.destroy({ where: { board_id, user_id } });
        return columnData;
    };
}
module.exports = ColumnRepository;
