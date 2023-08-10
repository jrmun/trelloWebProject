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
    // 로그인
    findLoginUser = async (email) => {
        const user = await User.findOne({
            where: { email: email },
        });

        return user;
    };
    // 사용자 정보 조회
    findUserId = async (name, email, password) => {
        const info = await User.findOne({ where: { email } });
    };
    // 사용자 정보 수정
    updateUser = async (user_id, name, password) => {
        await User.update({ name, password }, { where: { user_id } });
        return;
    };

    //id로 유저 조회
    findUserById = async (user_id) => {
        return await User.findOne({ where: { user_id } });
    };

    // 사용자 정보 삭제(회원탈퇴)
    deleteUser = async (user_id) => {
        const result = await User.destroy({ where: { user_id } });
        return result;
    };
}

module.exports = UserRepository;
