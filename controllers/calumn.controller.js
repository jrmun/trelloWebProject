const ColumnService = require('../services/calumn.service');

class ColumnController {
    columnService = new ColumnService();

    //칼럼 만들기
    createColumn = async (column_name, board_id, user_id) => {
        try {
            const { column_name } = req.body;
            const { user_id } = res.locals.user;
            const { board_id } = req.params;

            const columnData = await this.columnService.createColumn(column_name, user_id, board_id);
            res.status(201).json({ data: columnData });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    //칼럼 조회
    getColumn = async (req, res, next) => {
        try {
            const columnData = await this.columnService.findAllColumn();
            res.status(200).json({ data: columnData });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    //칼럼 아이디로 조회
    getColumnById = async (req, res, next) => {
        try {
            const { column_id } = req.params;
            const column = await this.columnService.findColumnById(column_id);
            res.status(200).json({ data: column });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    //칼럼 수정
    updateColumn = async (req, res, next) => {
        try {
            const { user_id } = res.locals.user;
            const { column_id, board_id } = res.params;
            const { column_name } = req.body;

            const updateColumn = await this.columnService.updateColumn(column_id, user_id, column_name, board_id);

            res.status(200).json({ data: updateColumn });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
    //칼럼 삭제
    deleteColumn = async (req, res, next) => {
        try {
            const { column_id } = req.params;
            const { user_id } = res.locals.user;

            const deleteColumn = await this.columnService.deleteColumn(column_id, user_id);

            res.status(200).json({ data: deleteColumn });
        } catch (error) {
            if (error.status) return res.status(error.status).json({ message: error.message });
            console.log(error);
            return res.status(500).json({ message: '알 수 없는 오류가 발생하였습니다.' });
        }
    };
}
module.exports = ColumnController;
