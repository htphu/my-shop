const db = require('../db')

module.exports = {
    addStatus: (data, callBack) => {
        const sql = 'INSERT INTO status SET ?'
        db.query(sql, [data], callBack)
    },
    getOneStatus: (id, callBack) => {
        const sql = 'SELECT * FROM status WHERE status_id=?'
        db.query(sql, [id], callBack)
    },
    getAllStatus: (callBack) => {
        const sql = 'SELECT * FROM status'
        db.query(sql, callBack)
    },
    updateStatus: (id, data, callBack)=>{
        const sql = 'UPDATE status SET ? WHERE status_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteStatus: (id, callBack)=>{
        const sql = 'DELETE FROM status WHERE status_id=?'
        db.query(sql, [id], callBack)
    },
}