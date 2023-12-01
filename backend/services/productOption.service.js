const db = require('../db')

module.exports = {
    addProductOption: (data, callBack) => {
        const sql = 'INSERT INTO product_options SET ?'
        db.query(sql, [data], callBack)
    },
    getAllProductOption: (callBack) => {
        const sql = 'SELECT * FROM product_options'
        db.query(sql, callBack)
    },
    updateProductOption: (id, data, callBack)=>{
        const sql = 'UPDATE product_options SET ? WHERE product_option_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteProductOption: (id, callBack)=>{
        const sql = 'DELETE FROM product_options WHERE product_option_id=?'
        db.query(sql, [id], callBack)
    },
}