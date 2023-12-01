const uploadFileMiddleware = require('../middleware/upload');
const imageService = require('../services/image.service')
const fs = require("fs");

module.exports = {
    get: (req, res) => {
        imageService.getAllImage((error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json(response);
        })
    },
    post: async (req, res) => {
        try {
            await uploadFileMiddleware(req, res)
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }

            const data = {
                PRODUCT_ID: req.body.PRODUCT_ID,
                PATH: "/public/uploads/" + req.file.filename
            }

            imageService.addImage(data, (error, response) => {
                if (error)
                    throw new Error(error)
                else
                    res.status(200).json('Upload image thành công');
            })

        } catch (error) {
            res.status(500).json(error);
        }

    },
    put: async (req, res) => {
        try {
            await uploadFileMiddleware(req, res)
            if (req.file == undefined) {
                return res.status(400).send({ message: "Please upload a file!" });
            }
            const data = {
                PATH: "/public/uploads/" + req.file.filename
            }
            imageService.updateImage(req.params.id, data, (error, response) => {
                if (error)
                    res.status(500).json(error);
                else
                    res.status(200).json('Update image thành công');
            })

        } catch (error) {
            res.status(500).json(error);
        }
    },
    detail:  (req, res) => {
        
        imageService.getOneImage(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json(response);
        })
    },
    delete: (req, res) => {
        const fileName = req.query.name;
        const directoryPath = __basedir + "/public/uploads/";

        fs.unlink(directoryPath + fileName, (err) => {
            if (err) {
                res.status(500).json(err);
            }  
        });
        imageService.deleteImage(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);    
        })
        
        res.status(200).json('Delete image thành công');
    }
}