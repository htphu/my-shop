const db = require('../db')

module.exports = {
    addReview: (data, callBack) => {
        const sql = 'INSERT INTO reviews SET ?'
        db.query(sql, [data], callBack)
    },
    getReviewOfProduct: (id, callBack) => {
        const sql = 'SELECT reviews.REVIEW_ID, reviews.USER_ID, reviews.STAR, reviews.COMMENT, user.NAME as NAME_USER, products.NAME as NAME_PRODUCT '+
        'FROM reviews, user, products '+
        'WHERE reviews.PRODUCT_ID=? AND reviews.USER_ID=user.USER_ID AND reviews.PRODUCT_ID=products.PRODUCT_ID'
        db.query(sql, [id], callBack)
    },
    getAllReview: (callBack) => {
        const sql = 'SELECT * FROM reviews'
        db.query(sql, callBack)
    },
    updateReview: (id, data, callBack)=>{
        const sql = 'UPDATE reviews SET ? WHERE review_id=?';
        db.query(sql, [data, id], callBack)
    },
    deleteReview: (id, callBack)=>{
        const sql = 'DELETE FROM reviews WHERE review_id=?'
        db.query(sql, [id], callBack)
    },
}