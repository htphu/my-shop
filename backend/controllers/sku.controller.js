const skuService = require('../services/sku.service')

module.exports = {
    get: (req, res) => {
        skuService.getAllSku((error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json(response);
        })
    },
    detail: (req, res) => {
        skuService.getAllSkuByProductID(req.params.id,(error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        skuService.addSku(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Tạo sku thành công');
        });
    },
    put: (req, res) => {
        skuService.updateSku(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update sku thành công');
        })
    },
    delete: (req, res) => {
        skuService.deleteSku(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete sku thành công');
        })
    }
}