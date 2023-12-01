const productVariantService = require('../services/productVariant.service')

module.exports = {
    get: (req, res) => {
        productVariantService.getAllProductVariant((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        productVariantService.addProductVariant(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json({ID: response.insertId, message: 'Thêm product variant thành công'});
        });
    },
    put: (req, res) => {
        productVariantService.updateProductVariant(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update product variant thành công');
        })
    },
    detail: (req, res) => {
        productVariantService.getOneProductVariant(req.params.id, (error, response) => {
            if (response[0])
                res.status(200).json(response[0])
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        productVariantService.deleteProductVariant(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete product variant thành công');
        })
    }
}