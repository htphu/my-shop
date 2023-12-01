const db = require('../db')

module.exports = {
    addOrder: (data, callBack) => {
        const sql = 'INSERT INTO orders SET ?'
        db.query(sql, [data], callBack)
    },
    getOneOrder: (id, callBack) => {
        const sql = 'SELECT orders.ORDER_ID, QUANTITY, orders.PRICE, DATE, orders.USER_ID, status.NAME as NAME_STATUS, orders.PRODUCT_ID, sku.PRODUCT_OPTION_ID, sku.PRICE as PRICE_OF_SKU  FROM orders, status, sku WHERE USER_ID=? AND orders.STATUS_ID = status.STATUS_ID AND orders.SKU_ID = sku.SKU_ID'
        db.query(sql, [id], callBack)
    },
    getAllOrderByUserID: (id, callBack) => {
        const sql = 'SELECT orders.ORDER_ID, orders.STATUS_ID, orders.PRODUCT_ID, orders.QUANTITY, orders.PRICE, orders.DATE, user.NAME as NAME_USER, user.ADDRESS, user.PHONE, status.NAME as NAME_STATUS, products.NAME as NAME_PRODUCT, sku.PRODUCT_OPTION_ID, sku.PRICE as PRICE_OF_SKU, images.PATH as PATH_IMAGE, product_options.NAME as NAME_PRODUCT_OPTION '+
        'FROM orders, status, sku, products, images, user, product_options '+
        'WHERE orders.USER_ID=? AND orders.STATUS_ID = status.STATUS_ID AND orders.SKU_ID = sku.SKU_ID AND orders.PRODUCT_ID = products.PRODUCT_ID AND orders.PRODUCT_ID = images.PRODUCT_ID AND orders.USER_ID = user.USER_ID AND sku.PRODUCT_OPTION_ID = product_options.PRODUCT_OPTION_ID '+
        'ORDER BY orders.ORDER_ID DESC'
        db.query(sql, [id], callBack)
    },
    getAllOrder: (callBack) => {
        const sql = 'SELECT orders.ORDER_ID, orders.STATUS_ID, orders.PRODUCT_ID, orders.QUANTITY, orders.PRICE, orders.DATE, user.NAME as NAME_USER, user.ADDRESS, user.PHONE, status.NAME as NAME_STATUS, products.NAME as NAME_PRODUCT, sku.PRODUCT_OPTION_ID, sku.PRICE as PRICE_OF_SKU, images.PATH as PATH_IMAGE, product_options.NAME as NAME_PRODUCT_OPTION '+
        'FROM orders, status, sku, products, images, user, product_options '+
        'WHERE orders.STATUS_ID = status.STATUS_ID AND orders.SKU_ID = sku.SKU_ID AND orders.PRODUCT_ID = products.PRODUCT_ID AND orders.PRODUCT_ID = images.PRODUCT_ID AND orders.USER_ID = user.USER_ID AND sku.PRODUCT_OPTION_ID = product_options.PRODUCT_OPTION_ID '+
        'ORDER BY orders.ORDER_ID DESC'
        db.query(sql, callBack)
    },
    updateOrder: (id, data, callBack)=>{
        const sql = 'UPDATE orders SET ? WHERE order_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteOrder: (id, callBack)=>{
        const sql = 'DELETE FROM orders WHERE order_id=?' 
        db.query(sql, [id], callBack)
    },
}