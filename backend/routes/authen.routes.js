const authenController = require('../controllers/authen.controller')
const userController = require('../controllers/user.controller')
const checkUserName = require('../middleware/checkUserName')
const validLogin = require('../middleware/validLogin')
module.exports = (app) => {
    app.route('/api/v1/login')
        .post(validLogin, authenController.login)

    app.route('/api/v1/logout')
        .post(authenController.logout)

    app.route('/api/v1/isadmin')
        .post(authenController.isAdmin)

    app.route('/api/v1/register')
        .post(checkUserName.isEXITS, userController.post)

    app.route('/api/v1/refreshToken')
        .post(authenController.refreshToken)
        .delete(authenController.deleteRefreshToken)

    app.route('/api/v1/refreshToken/:id')
        .delete(authenController.deleteRefreshToken)
}