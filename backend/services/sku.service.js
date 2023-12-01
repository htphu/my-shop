const db = require('../db')

module.exports = {
    addSku: (data, callBack) => {
        const sql = 'INSERT INTO sku SET ?'
        db.query(sql, [data], callBack)
    },
    getOneSku: (id, callBack) => {
        const sql = 'SELECT * FROM sku WHERE sku_id=?'
        db.query(sql, [id], callBack)
    },
    getAllSkuByProductID: (id,callBack) => {
        const sql = 'SELECT * FROM sku WHERE product_id=?'
        db.query(sql,[id] ,callBack)
    },
    getAllSku: (callBack) => {
        const sql = 'SELECT * FROM sku'
        db.query(sql ,callBack)
    },
    updateSku: (id, data, callBack)=>{
        const sql = 'UPDATE sku SET ? WHERE sku_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteSku: (id, callBack)=>{
        const sql = 'DELETE FROM sku WHERE sku_id=?'
        db.query(sql, [id], callBack)
    },
}