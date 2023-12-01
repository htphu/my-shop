const db = require('../db')
module.exports = {
    addUser: (data, callBack) => {
        const sql = 'INSERT INTO user SET ?'
        db.query(sql, [data], callBack)
    },
    getUserByUserName: (userName, callBack) => {
        const sql = 'SELECT * FROM user WHERE USER_NAME=?'
        db.query(sql, [userName], callBack)
    },
    getUserById: (id, callBack) => {
        const sql = 'SELECT USER_ID, USER_NAME, NAME, PHONE, ADDRESS, IS_ADMIN, REFRESH_TOKEN FROM user WHERE USER_ID=?'
        db.query(sql, [id], callBack)
    },
    getPasswordUser: (userName, callBack) => {
        const sql = 'SELECT PASSWORD FROM user WHERE USER_NAME=?'
        db.query(sql, [userName], callBack)
    },
    getAllUser: (callBack) => {
        const sql = 'SELECT USER_ID, USER_NAME, NAME, PHONE, ADDRESS, IS_ADMIN, REFRESH_TOKEN FROM user'
        db.query(sql, callBack)
    },
    updateUser: (id, data, callBack)=>{
        const sql = 'UPDATE user SET ? WHERE user_id=?';
        db.query(sql, [data, id], callBack)
    },
    updatePassword: (id, PASSWORD, callBack)=>{
        const sql = 'UPDATE user SET PASSWORD=? WHERE user_id=?';
        db.query(sql, [PASSWORD, id], callBack)
    },
    deleteUser: (id, callBack)=>{
        const sql = 'DELETE FROM user WHERE user_id=?'
        db.query(sql, [id], callBack)
    },
}