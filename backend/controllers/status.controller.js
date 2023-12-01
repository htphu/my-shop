const statusService = require('../services/status.service')

module.exports = {
    get: (req, res) => {
        statusService.getAllStatus((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
            
        })
    },
    post: (req, res) => {
        statusService.addStatus(req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Tạo status thành công');
        });
    },
    put: (req, res) => {
        statusService.updateStatus(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update image thành công');
        })
    },
    detail: (req, res) => {
        statusService.getOneStatus(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    delete: (req, res) => {
        statusService.deleteStatus(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete image thành công');
        })
    }
}