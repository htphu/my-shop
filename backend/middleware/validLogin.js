const userService = require('../services/user.service')
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    //Check user name vs password
    userService.getUserByUserName(req.body.USER_NAME, (error, response) => {
        if (!response[0]) {
            res.status(400).json('User name không tồn tại')
            return
        } else {
            //password
            const comparePass = bcrypt.compareSync(req.body.PASSWORD, response[0].PASSWORD);
            if (!comparePass) {
                res.status(400).json('Mật khẩu sai')
                return
            }
            req.body.IS_ADMIN = response[0].IS_ADMIN
            req.body.USER_ID = response[0].USER_ID
            next()
        }

    })
}

