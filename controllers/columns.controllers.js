const ColumnService = require('../services/columns.services');

class ColumnController {
    columnService = new ColumnService();

    getColumnList = async (req, res, next) => {
        try {
            const { board_id } = req.params;
            const { status, message, result } = await this.columnService.getColumnList(board_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };

    createColumn = async (req, res, next) => {
        try {
            const { column_name } = req.body;
            const { board_id } = req.params;
            const user_id = res.locals.user.user_id;
            const { status, message, result } = await this.columnService.createColumn({ board_id, user_id, column_name });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    updateColumn = async (req, res, next) => {
        try {
            const { name } = req.body;
            const { column_id } = req.params;
            const { status, message, result } = await this.columnService.updateColumn({ column_id, name });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    deleteColumn = async (req, res, next) => {
        try {
            const { column_id } = req.params;
            const { status, message, result } = await this.columnService.deleteColumn(column_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    moveColumn = async (req, res, next) => {
        try {
            const { position } = req.body;
            const { column_id } = req.params;
            const { status, message, result } = await this.columnService.moveColumn({ column_id, position });
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    getCoulmnInBoardId = async (req, res, next) => {
        try {
            const { column_id } = req.params;
            const { status, message, result } = await this.columnService.getCoulmnInBoardId(column_id);
            return res.status(status).json({ message, result });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}
module.exports = ColumnController;
