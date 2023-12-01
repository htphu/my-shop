const productService = require('../services/product.service')

module.exports = {
    get: (req, res) => {
        productService.getAllProduct((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        productService.addProduct(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json({ID: response.insertId, message:'Tạo product thành công'});
        });
    },
    put: (req, res) => {
        productService.updateProduct(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update product thành công');
        })
    },
    detail: (req, res) => {
        productService.getOneProduct(req.params.id, (error, response) => {
            if (response[0])
                res.status(200).json(response[0])
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        productService.deleteProduct(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete product thành công');
        })
    }

}