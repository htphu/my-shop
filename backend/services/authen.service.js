const db = require('../db')
const jwt = require('jsonwebtoken')
module.exports = {
    createToken: (data, secret, life) => {
        return new Promise((resolve, reject) => {
            jwt.sign(
                { data: data },
                secret,
                {
                    algorithm: "HS256",
                    expiresIn: life,
                },
                (error, token) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(token);
                });
        })
    },
    verifyToken: (token, secret) => {
        return new Promise((resolve, reject) => {

            jwt.verify(token, secret, (error, decoded) => {
                if (error) {
                    reject(error);
                }
                resolve(decoded);
            });

        })
    },
    deleteRefreshToken: (id, data, callBack) => {
        const sql = 'UPDATE user SET ? WHERE user_id=?' 
        db.query(sql, [data, id], callBack)
    }
}