const userService = require('../services/user.service')
module.exports = {
    isEXITS: function(req, res, next){
        userService.getUserByUserName(req.body.USER_NAME, (error, response) => {
            if (response[0]){
                return res.status(500).json('user name da ton tai')
            }else{
                next()
            }
        })
    
    },
}