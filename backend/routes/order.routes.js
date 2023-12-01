const orderController = require('../controllers/order.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/order')
        .get(checkAccessToken ,orderController.get)
        .post(checkAccessToken ,orderController.post)

    app.route('/api/v1/order/:id')
        .get(checkAccessToken ,orderController.detail)
        .put(checkAccessToken ,orderController.put)
        .delete(checkAccessToken ,orderController.delete)

    app.route('/api/v1/order-user/:id')
        .get(checkAccessToken, orderController.getOfOneUser)
}