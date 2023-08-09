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
            res.status(401).json({ message: error.message });
        }
    };
    // 사용자 정보 조회
    getUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        try {
            const getUser = await this.UserService.getUser(name, email, password);
        } catch (error) {}
    };
}

module.exports = UsersController;
