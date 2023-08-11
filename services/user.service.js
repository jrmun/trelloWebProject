const UserRepository = require('../repositories/user.repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const env = process.env;

class UserService {
    userRepository = new UserRepository();
    // 회원가입
    createUser = async (name, email, password) => {
        const createUserData = await this.userRepository.createUser(name, email, password);

        return createUserData;
    };
    // 로그인
    loginUser = async (email, password) => {
        const user = await this.userRepository.findLoginUser(email);
        if (!user) throw new Error('닉네임을 확인해주세요.');
        if (user) {
            const pwConfirm = await bcrypt.compare(password, user.password);
            if (!pwConfirm) throw new Error('비밀번호를 확인해 주세요.');
        }

        const token = jwt.sign({ user_id: user.user_id }, env.COOKIE_SECRET);

        return token;
    };
    // 사용자 정보 조회
    getUser = async (name, email, password) => {
        const user = await this.userRepository.findUserId(name, email, password);
        return getUser;
    };
    // 사용자 정보 수정
    updateUser = async (user_id, name, password) => {
        const user = await this.userRepository.findUserById(user_id);
        if (!name) {
            name = user.name;
        }
        if (!password) {
            password = user.password;
        } else {
            password = await bcrypt.hash(password, 10);
        }
        const result = await this.userRepository.updateUser(user_id, name, password);
        return { message: '정보 수정에 성공했습니다.' };
    };

    // 사용자 정보 삭제(회원탈퇴)
    deleteUser = async (user_id) => {
        const user = await this.userRepository.findUserById(user_id);
        if (!user) return { message: '존재하지 않는 회원입니다.' };
        const result = await this.userRepository.deleteUser(user_id);
        return { message: '회원 탈퇴에 성공했습니다', result };
    };
}

module.exports = UserService;
