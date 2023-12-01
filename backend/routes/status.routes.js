const statusController = require('../controllers/status.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/status')
        .get(statusController.get)
        .post(checkAccessToken ,statusController.post)

    app.route('/api/v1/status/:id')
        .get(statusController.detail)
        .put(checkAccessToken ,statusController.put)
        .delete(checkAccessToken ,statusController.delete)
}