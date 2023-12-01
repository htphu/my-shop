const productOptionController = require('../controllers/productOption.controller')
const checkAccessToken = require('../middleware/checkAccessToken')
module.exports = (app) => {
    app.route('/api/v1/productOption')
        .get(productOptionController.get)
        .post(checkAccessToken ,productOptionController.post)

    app.route('/api/v1/productOption/:id')
        .get(productOptionController.detail)
        .put(checkAccessToken ,productOptionController.put)
        .delete(checkAccessToken ,productOptionController.delete)
    
}