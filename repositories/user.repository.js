const { User } = require('../models');

const bcrypt = require('bcrypt');

class UserRepository {
    createUser = async (name, email, password) => {
        const encrypted = await bcrypt.hash(password, 10);
        const createUserData = await User.create({
            name,
            email,
            password: encrypted,
        });

        return createUserData;
    };

    findUserById = async (id) => {
        const user = await User.findByPk(id);

        return user;
    };

    findLoginUser = async (email) => {
        const user = await User.findOne({
            where: { email },
        });

        return user;
    };
}

module.exports = UserRepository;
