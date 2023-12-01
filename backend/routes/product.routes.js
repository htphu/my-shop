const productController = require('../controllers/product.controller')
const checkAccessToken = require('../middleware/checkAccessToken')
module.exports = (app) => {
    app.route('/api/v1/product')
        .get(productController.get)
        .post(checkAccessToken ,productController.post)

    app.route('/api/v1/product/:id')
        .get(productController.detail)
        .put(checkAccessToken, productController.put)
        .delete(checkAccessToken, productController.delete)
}
