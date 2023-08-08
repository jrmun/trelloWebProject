const jwt = require('jsonwebtoken');
const { users } = require('../models');

module.exports = async (req, res, next) => {
    try {
        const { authorization } = req.cookies;
        const [tokenType, token] = authorization.split(' ');
        if (tokenType !== 'Bearer') {
            return res.status(401).json({ message: '토큰 타입이 일치하지 않습니다.' });
        }

        const decodedToken = jwt.verify(token, process.env.COOKIE_SECRET);
        const userId = decodedToken.userId;

        const user = await users.findOne({ where: { id: userId } });
        if (!user) {
            res.clearCookie('authorization');
            return res.status(401).json({ message: '토큰 사용자가 존재하지 않습니다.' });
        }
        res.locals.user = user;

        next();
    } catch (error) {
        res.clearCookie('authorization');
        return res.status(401).json({
            errorMessage: error.message,
        });
    }
};
