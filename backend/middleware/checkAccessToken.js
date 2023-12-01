const authenService = require("../services/authen.service");

module.exports = async (req, res, next) => {
    if (!req.cookies.accessToken) {
        // Không tìm thấy token trong request
        return res.status(403).json({message: "Khong tim thay access token"});
    }
    
    const tokenFromClient = req.cookies.accessToken.split(' ')[1];

    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = await authenService.verifyToken(tokenFromClient, process.env.ACCESS_TOKEN_SECRET)

            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded.data;

            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {
            // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
            return res.status(401).json(error);
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).json({message: "Khong tim thay access token"});
    }
}