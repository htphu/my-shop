const productOptioService = require('../services/productOption.service')

module.exports = {
    get: (req, res) => {
        productOptioService.getAllProductOption((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        productOptioService.addProductOption(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Tạo product option thành công');
        });
    },
    put: (req, res) => {
        productOptioService.updateProductOption(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update product option thành công');
        })
    },
    detail: (req, res) => {
        productOptioService.getOneProductOption(req.params.id, (error, response) => {
            if (response[0])
                res.status(200).json(response[0])
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        productOptioService.deleteProductOption(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete product option thành công');
        })
    }
}