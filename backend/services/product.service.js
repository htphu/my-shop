const db = require('../db')
module.exports = {
    addProduct: (data, callBack) => {
        const sql = 'INSERT INTO products SET ?'
        db.query(sql, [data], callBack)
    },
    getOneProduct: (id, callBack) => {
        const sql = 'SELECT * FROM products WHERE product_id=?'
        db.query(sql, [id], callBack)
    },
    getAllProduct: (callBack) => {
        const sql = 'SELECT * FROM products'
        db.query(sql, callBack)
    },
    updateProduct: (id, data, callBack)=>{
        const sql = 'UPDATE products SET ? WHERE product_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteProduct: (id, callBack)=>{
        const sql = 'DELETE FROM products WHERE product_id=?'
        db.query(sql, [id], callBack)
    },
}