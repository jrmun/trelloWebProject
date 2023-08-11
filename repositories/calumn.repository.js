const { Column } = require('../models');
const { Op } = require('sequelize');

class ColumnRepository {
    createColumn = async ({ column_name, board_id, user_id }) => {
        const calumnData = await Column.create({
            column_name,
            board_id,
            user_id,
        });
        return calumnData;
    };

    findColumnByName = async (column_name) => {
        return await Column.findOne({ where: { column_name: column_name } });
    };
    findAllColumn = async (board_id) => {
        const column = await Column.findAll({
            where: { board_id: board_id },
            order: [['createdAt']],
        });
        return column;
    };
    findColumnById = async (column_id) => {
        const column = await Column.findByPk(column_id);
        return column;
    };
    updateColumn = async (column_id, user_id, column_name) => {
        console.log('rep:', user_id);
        const columnData = await Column.update({ column_name }, { where: { [Op.and]: [{ user_id: user_id }, { column_id: column_id }] } });
        return columnData;
    };

    deleteColumn = async (column_id, user_id) => {
        const columnData = await Column.destroy({ where: { [Op.and]: [{ column_id, user_id }] } });
        return columnData;
    };
}
module.exports = ColumnRepository;
