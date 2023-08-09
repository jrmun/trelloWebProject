const { User } = require('../models');

const bcrypt = require('bcrypt');

class UserRepository {
    // 회원가입
    createUser = async (name, email, password) => {
        const encrypted = await bcrypt.hash(password, 10);
        const createUserData = await User.create({
            name,
            email,
            password: encrypted,
        });

        return createUserData;
    };

    findLoginUser = async (email) => {
        const user = await User.findOne({
            where: { email: email },
        });

        return user;
    };
}

module.exports = UserRepository;
