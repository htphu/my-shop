const userController = require('../controllers/user.controller')
const checkAccessToken = require('../middleware/checkAccessToken')
const checkPassword = require('../middleware/checkPassword')
const checkUserName = require('../middleware/checkUserName')

module.exports = (app) => {
    app.route('/api/v1/user')
        .get(checkAccessToken, userController.get)
        .post(checkUserName.isEXITS, userController.post)

    app.route('/api/v1/user/:id')
        .put(checkAccessToken, userController.put)
        .delete(checkAccessToken, userController.delete)
        .get(checkAccessToken, userController.detail)

    app.route('/api/v1/update-password/:id')
        .put(checkAccessToken, checkPassword, userController.updatePassword)
}