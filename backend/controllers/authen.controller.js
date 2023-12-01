const userService = require('../services/user.service')
const authenService = require('../services/authen.service');

module.exports = {
    login: async (req, res) => {
        try {
            const data = {
                USER_NAME: req.body.USER_NAME,
                USER_ID: req.body.USER_ID,
                IS_ADMIN: req.body.IS_ADMIN
            }
            const accessToken = await authenService.createToken(data, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE);
            const refreshToken = await authenService.createToken(data, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_LIFE);
            //update refresh token vao database user
            userService.updateUser(req.body.USER_ID, { REFRESH_TOKEN: refreshToken }, (error, response) => {
                if (error) {
                    res.status(500).json(error);
                    return
                }
            })
            const oneWeek = 7 * 24 * 3600 * 1000
            res.cookie('accessToken', "Bearer " + accessToken, { httpOnly: true, expires: new Date(Date.now() + oneWeek) })
            res.cookie('refreshToken', refreshToken, { httpOnly: true, expires: new Date(Date.now() + oneWeek) })
            res.status(200).json(req.body);
        } catch (error) {
            res.status(500).send(error)
        }
    },
    logout: (req, res) => {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(200).json({ message: "logout success" });;
    },
    refreshToken: async (req, res) => {
        try {
            const refreshTokenFromClient = req.cookies.refreshToken;

            const decoded = await authenService.verifyToken(refreshTokenFromClient, process.env.REFRESH_TOKEN_SECRET)

            const userName = decoded.data.USER_NAME;
            userService.getUserByUserName(userName,async (error, response) => {
                if (!response[0].REFRESH_TOKEN) {
                    return res.status(500).json({message: 'Refresh token DB'})
                } else {
                    if (refreshTokenFromClient !== response[0].REFRESH_TOKEN) {
                        return res.status(500).json({message: 'invalid token'})
                    }else{
                        const accessToken = await authenService.createToken(decoded.data, process.env.ACCESS_TOKEN_SECRET, process.env.ACCESS_TOKEN_LIFE)
                        const oneWeek = 7 * 24 * 3600 * 1000
                        res.cookie('accessToken', "Bearer " + accessToken, { httpOnly: true, expires: new Date(Date.now() + oneWeek) })
                        return res.status(200).json({ message: 'Refresh token done' });
                    }
                }
            })
           
        } catch (error) {
            res.status(500).json(error)
        }

    }, 
    deleteRefreshToken: (req, res)=>{
        try {
            const userID = req.params.id
            const data = {REFRESH_TOKEN: ''}
            authenService.deleteRefreshToken(userID, data, (err, response)=>{
                if (err) {
                    throw new Error(err)
                }
                return res.status(200).json({ message: 'DELETE Refresh token done' });
            })
        } catch (error) {
            res.status(500).send(error)
        }
    },
    isAdmin: async (req, res) => {
        try {
            const refreshTokenFromClient = req.cookies.refreshToken;

            const decoded = await authenService.verifyToken(refreshTokenFromClient, process.env.REFRESH_TOKEN_SECRET)

            if (!!decoded.data.IS_ADMIN) {
                return res.status(200).json({message: "Admin"})
            }else{
                return res.status(400).json({message: "Not Admin"})
            }
        } catch (error) {
            return res.status(400).json({message: "Not Admin"})
        }
    },
}