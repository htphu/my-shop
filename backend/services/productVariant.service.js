const db = require('../db')

module.exports = {
    addProductVariant: (data, callBack) => {
        const sql = 'INSERT INTO product_variants SET ?'
        db.query(sql, [data], callBack)
    },
    getOneProductVariant: (id, callBack) => {
        const sql = 'SELECT * FROM product_variants WHERE product_variant_id=?'
        db.query(sql, [id], callBack)
    },
    getAllProductVariant: (callBack) => {
        const sql = 'SELECT * FROM product_variants'
        db.query(sql, callBack)
    },
    updateProductVariant: (id, data, callBack)=>{
        const sql = 'UPDATE product_variants SET ? WHERE product_variant_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteProductVariant: (id, callBack)=>{
        const sql = 'DELETE FROM product_variants WHERE product_variant_id=?'
        db.query(sql, [id], callBack)
    },
}