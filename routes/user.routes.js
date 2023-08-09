const express = require('express');
const router = express.Router();

const { User } = require('../models');
const auth = require('../middlewares/auth');

const UsersController = require('../controllers/user.controllers');
const usersController = new UsersController();

// 회원가입
router.post('/users/signup', usersController.createUser);
// 로그인
router.post('/users/login', usersController.login);
// 사용자 정보 조회
router.get('/users/userinfo', usersController.getUser);
// 사용자 정보 수정

// 사용자 정보 삭제(회원탈퇴)
// router.delete('/users/signout', usersController.deleteUser);

router.post('/users/logout', (req, res) => {
    res.clearCookie('authorization', { httpOnly: true, path: '/' });
    res.json({ message: '로그아웃되었습니다.' });
});

router.get('/users/me', auth, async (req, res) => {
    const { user_id } = res.locals.user;

    const user = await User.findOne({ where: { user_id } });

    return res.status(200).json({ data: user });
});

module.exports = router;
