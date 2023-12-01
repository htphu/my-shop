const imageController = require('../controllers/image.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/image')
        .get(imageController.get)
        .post(checkAccessToken ,imageController.post)

    app.route('/api/v1/image/:id')
        .get(imageController.detail)
        .put(checkAccessToken ,imageController.put)
        .delete(checkAccessToken ,imageController.delete)
}