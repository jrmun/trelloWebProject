const ColumnService = require('../services/column.service');

class ColumnController {
    columnService = new ColumnService();

    createColumn = async (column_name, board_id, user_id) => {
        const { column_name } = req.body;
        const { user_id } = res.locals.user;
        const { board_id } = req.params;

        const columnData = await this.columnService.createColumn(column_name, user_id, board_id);
        res.status(201).json({ data: columnData });
    };

    getColumn = async (req, res, next) => {
        const columnData = await this.columnService.findAllColumn();
        res.status(200).json({ data: columnData });
    };

    getColumnById = async (req, res, next) => {
        const { column_id } = req.params;
        const column = await this.columnService.findColumnById(column_id);
        res.status(200).json({ data: column });
    };

    updateColumn = async (req, res, next) => {
        const { user_id } = res.locals.user;
        const { column_id, board_id } = res.params;
        const { column_name } = req.body;

        const updateColumn = await this.columnService.updateColumn(column_id, user_id, column_name, board_id);

        res.status(200).json({ data: updateColumn });
    };

    deleteColumn = async (req, res, next) => {
        const { column_id } = req.params;
        const { user_id } = res.locals.user;

        const deleteColumn = await this.columnService.deleteColumn(column_id, user_id);

        res.status(200).json({ data: deleteColumn });
    };
}
module.exports = ColumnController;
