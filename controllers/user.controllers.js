const UserService = require('../services/user.service');

class UsersController {
    userService = new UserService();

    createUser = async (req, res, next) => {
        const { name, email, password } = req.body;
        const createUserData = await this.userService.createUser(name, email, password);

        res.status(201).json({ data: createUserData });
    };

    getUserById = async (req, res, next) => {
        const { id } = req.params;
        const user = await this.userService.findUserById(id);

        res.status(200).json({ data: user });
    };

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
}

module.exports = UsersController;
