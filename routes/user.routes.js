const express = require('express');
const router = express.Router();

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

module.exports = router;
