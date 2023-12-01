const reviewController = require('../controllers/review.controller')
const checkAccessToken = require('../middleware/checkAccessToken')

module.exports = (app) => {
    app.route('/api/v1/review')
        .get(reviewController.get)
        .post(checkAccessToken ,reviewController.post)

    app.route('/api/v1/review/:id')
        .get(reviewController.detail)
        .put(checkAccessToken ,reviewController.put)
        .delete(checkAccessToken ,reviewController.delete)
}