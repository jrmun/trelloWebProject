const { Column } = require('../models');
const { Op } = require('sequelize');

class ColumnRepository {
    columnFindAll = async (board_id) => {
        return await Column.findAll({
            where: { board_id: board_id },
            order: ['position'],
        });
    };

    columnFindOne = async (column_id) => {
        return await Column.findOne({ where: { column_id: column_id } });
    };

    createColumn = async ({ board_id, user_id, column_name }) => {
        const columnList = await Column.findAll({ where: { board_id: board_id } });
        if (columnList) {
            const maxColumnPosition = await Column.max('position');
            const position = maxColumnPosition + 1;
            return await Column.create({ board_id, user_id, column_name, position });
        } else {
            return await Column.create({ board_id, user_id, column_name });
        }
    };

    deleteColumn = async (column_id) => {
        return await Column.delete({ where: { column_id: column_id } });
    };

    moveColumn = async ({ column_id, position }) => {
        return await Column.update({ position }, { where: { column_id: column_id } });
    };
}

module.exports = ColumnRepository;