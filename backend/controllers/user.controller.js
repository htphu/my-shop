const bcrypt = require('bcrypt');
const saltRounds = 10;
const userService = require('../services/user.service')

module.exports = {
    get: (req, res) => {
        userService.getAllUser((error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json(response);
        })
    },
    post: (req, res) => {
        const data = req.body.PASSWORD
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data, salt);
        req.body.PASSWORD = hash;
        userService.addUser(req.body, (error, response) => {
            if (error){
                return res.status(500).json(error);
            }else{
                return res.status(200).json('Tạo User thành công');
            }
        });

    },
    put: (req, res) => {
        userService.updateUser(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json({message:'Update User thành công'});
        })
    },
    updatePassword: (req, res) => {
        const data = req.body.NEW_PASSWORD
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(data, salt);
        userService.updatePassword(req.params.id, hash, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json({message:'Update password thành công'});
        })
    },
    detail: (req, res) => {
        userService.getUserById(req.params.id, (error, response) => {
            if (response[0])
                res.status(200).json(response[0])
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        userService.deleteUser(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete User thành công');
        })
    }

}
