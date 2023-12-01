const userService = require('../services/user.service')
const bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
  userService.getUserByUserName(req.jwtDecoded.USER_NAME, (error, response) => {
      const comparePass = bcrypt.compareSync(req.body.OLD_PASSWORD, response[0].PASSWORD);
      if (comparePass) {
        next()
      }else{
        res.status(400).json({message: 'Mật khẩu sai'})
        return
      }
    }
  )
}
