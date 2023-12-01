const db = require('../db')

module.exports = {
    addImage: (data, callBack) => {
        const sql = 'INSERT INTO images SET ?'
        db.query(sql, [data], callBack)
    },
    getOneImage: (id, callBack) => {
        const sql = 'SELECT * FROM images WHERE product_id=?'
        db.query(sql, [id], callBack)
    },
    getAllImage: (callBack) => {
        const sql = 'SELECT * FROM images'
        db.query(sql, callBack)
    },
    updateImage: (id, data, callBack)=>{
        const sql = 'UPDATE images SET ? WHERE image_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteImage: (id, callBack)=>{
        const sql = 'DELETE FROM images WHERE image_id=?'
        db.query(sql, [id], callBack)
    },
}