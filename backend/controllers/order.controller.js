const orderService = require('../services/order.service');

module.exports = {
    get: (req, res) => {
        orderService.getAllOrder((error, response) => {
            if (error)
                res.status(500).json(error);
            else 
                res.status(200).json(response);
        })
    },
    getOfOneUser: (req, res) => {
        const userID = req.params.id
        if (userID == req.jwtDecoded.USER_ID) {
            orderService.getAllOrderByUserID(userID, (error, response) => {
                if (error)
                    res.status(500).json(error);
                else 
                    res.status(200).json(response);
            })
        }else{
            return res.status(500).json(error);
        }
    },
    post: (req, res) => {
        const data = {...req.body , USER_ID: req.jwtDecoded.USER_ID }
        orderService.addOrder(data, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json({message: 'Order thành công'});
        });
    },
    put: (req, res) => {
        orderService.updateOrder(req.params.id, req.body, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Update order thành công');
        })
    },
    detail: (req, res) => {
        orderService.getOneOrder(req.params.id, (error, response) => {
            if (response[0])
                res.status(200).json(response[0])
            else
                res.status(500).json(error)
        })
    },
    delete: (req, res) => {
        orderService.deleteOrder(req.params.id, (error, response) => {
            if (error)
                res.status(500).json(error);
            else
                res.status(200).json('Delete order thành công');
        })
    }
}