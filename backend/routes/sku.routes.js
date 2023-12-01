const skuController = require('../controllers/sku.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/sku')
        .post(checkAccessToken ,skuController.post)
        .get(skuController.get)

    app.route('/api/v1/sku/:id')
        .get(skuController.detail)
        .put(checkAccessToken ,skuController.put)
        .delete(checkAccessToken ,skuController.delete)
}