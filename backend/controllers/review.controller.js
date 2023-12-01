const reviewService = require('../services/review.service')

module.exports = {
    get: (req, res) => {
        reviewService.getAllReview((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        reviewService.addReview(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Tạo review thành công');
        });
    },
    put: (req, res) => {
        reviewService.updateReview(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update review thành công');
        })
    },
    detail: (req, res) => {
        reviewService.getReviewOfProduct(req.params.id, (error, response) => {
            if (response)
                res.status(200).json(response)
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        reviewService.deleteReview(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete review thành công');
        })
    }
}