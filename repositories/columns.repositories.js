const { Column } = require('../models');
const { Op } = require('sequelize');

class ColumnRepository {
    columnFindAll = async (board_id) => {
        return await Column.findAll({
            where: { board_id: board_id },
            order: ['column_id'],
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
        const column = await Column.findOne({ where: { position: position } });
        const newcolumn = await Column.findOne({ where: { column_id: column_id } });
        if (column) {
            const columnPosition = newcolumn.position;
            await Column.update({ position }, { where: { column_id: column_id } });
            return await Column.update({ position: columnPosition }, { where: { column_id: column.column_id } });
        }
        return await Column.update({ position }, { where: { column_id: column_id } });
    };

    getCoulmnInBoardId = async (column_id) => {
        const column = await Column.findOne({ where: { column_id: column_id } });
        return await Column.findAll({ where: { board_id: column.board_id } });
    };
}

module.exports = ColumnRepository;
