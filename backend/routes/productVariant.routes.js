const productVariantController = require('../controllers/productVariant.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/productVariant')
        .get(productVariantController.get)
        .post(checkAccessToken ,productVariantController.post)

    app.route('/api/v1/productVariant/:id')
        .get(productVariantController.detail)
        .put(checkAccessToken ,productVariantController.put)
        .delete(checkAccessToken ,productVariantController.delete)
}