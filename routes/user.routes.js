const express = require('express');
const router = express.Router();

const { User } = require('../models');
const auth = require('../middlewares/auth');

const UsersController = require('../controllers/user.controllers');
const usersController = new UsersController();

router.post('/users/signup', usersController.createUser);
router.post('/users/login', usersController.login);

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
