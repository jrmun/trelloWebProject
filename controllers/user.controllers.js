const UserService = require('../services/user.service');

class UsersController {
    userService = new UserService();
    // 회원가입
    createUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        const createUserData = await this.userService.createUser(name, email, password);

        res.status(201).json({ data: createUserData });
    };
    // 로그인
    login = async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const token = await this.userService.loginUser(email, password);

            res.cookie('authorization', `Bearer ${token}`);

            res.status(200).json({ message: '로그인 성공.' });
        } catch (error) {
            console.error(error.stack);
            res.status(401).json({ message: error.message });
        }
    };
    // 사용자 정보 조회
    getUser = async (req, res) => {
        try {
            const user = res.locals.user;
            res.status(200).json({ message: '프로필 조회에 성공하였습니다.', user });
        } catch (error) {
            res.status(500).json({ errorMessage: '프로필 조회에 실패하였습니다.' });
        }
    };
    // 사용자 정보 수정
    updateUser = async (req, res) => {
        const { name, password } = req.body;
        const { user_id } = res.locals.user;
        const { message, result } = await this.userService.updateUser(user_id, name, password);
        return res.status(201).json({ message, result });
    };
    // 사용자 정보 삭제(회원탈퇴)
    deleteUser = async (req, res, next) => {
        const { user_id } = res.locals.user;
        try {
            const { message, result } = await this.userService.deleteUser(user_id);
            res.status(200).json({ message, result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ errorMessage: '회원탈퇴에 실패하였습니다.' });
        }
    };
}

module.exports = UsersController;
