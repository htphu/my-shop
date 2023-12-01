-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 01, 2023 lúc 08:25 AM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `myshop`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `IMAGE_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `PATH` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`IMAGE_ID`, `PRODUCT_ID`, `PATH`) VALUES
(5, 3, '/public/uploads/1699602051492_10d37f3.jpg'),
(12, 10, '/public/uploads/1699862430484_913b617bc020.jpg'),
(13, 11, '/public/uploads/1700723324060_3k7kildmoeivee.jpg'),
(15, 13, '/public/uploads/1701267138347_vn-11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `ORDER_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(10) NOT NULL,
  `STATUS_ID` int(11) NOT NULL,
  `SKU_ID` int(11) NOT NULL,
  `QUANTITY` int(5) NOT NULL,
  `PRICE` decimal(10,2) NOT NULL,
  `DATE` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`ORDER_ID`, `USER_ID`, `PRODUCT_ID`, `STATUS_ID`, `SKU_ID`, `QUANTITY`, `PRICE`, `DATE`) VALUES
(3, 1, 11, 4, 24, 1, '200000.00', '2023-11-25'),
(4, 1, 10, 3, 21, 2, '180000.00', '2023-11-25'),
(5, 1, 3, 3, 1, 2, '100000.00', '2023-11-26'),
(6, 1, 11, 1, 24, 1, '200000.00', '2023-11-27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `PRODUCT_ID` int(11) NOT NULL,
  `PRODUCT_VARIANT_ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DESCRIPTION` text COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`PRODUCT_ID`, `PRODUCT_VARIANT_ID`, `NAME`, `DESCRIPTION`) VALUES
(3, 6, 'Giày Sneaker A01', '<p>Đế giày được làm bằng chất liệu cao su đúc nguyên khối chắc chắn có khắc họa tiết để tăng độ ma sát, chống trơn trượt.&nbsp;</p><p>Màu sắc:&nbsp;</p><p>Size: 39-43 ĐẶC ĐIỂM SẢN PHẨM&nbsp;</p><p>Giày dễ phối đồ thích hợp cho các hoạt động đi lại hàng ngày, chạy bộ&nbsp;</p><p>Mũi Giày tròn, đế cao su tổng hợp, xẻ rãnh tạo cảm giác thoải mái khi đi&nbsp;</p><p>Thích hợp với các mùa trong năm: Xuân - Hè - Thu - Đông</p>'),
(10, 2, 'Áo khoác dù nam', '<p>Size S : 38kg - 39kg Cao Dưới 1m65&nbsp;</p><p>Size M: 40kg - 55kg Cao Dưới 1m70&nbsp;</p><p>Size L: 56kg - 62kg Cao Dưới 1m75&nbsp;</p><p>Size XL: 63kg - 75kg Cao Dưới 1m78&nbsp;</p><p>Size XXL: 76kg - 80kg Cao Dưới 1m80</p>'),
(11, 6, 'Giày nam KATEZAG49 cổ thấp', '<p>● MÔ TẢ SẢN PHẨM - Giày nam KATEZA49</p><p>Tên sản phẩm) sở hữu thiết kế thời trang, năng động, cùng chất liệu bền bỉ hỗ trợ vận động tốt và bảo vệ đôi chân cho người mang.</p><p>▪︎ Đế cao su mềm, êm ái giúp bạn cảm thấy dễ chịu khi di chuyển trong thời gian dài.</p><p>▪︎ Đồng hành cùng thiết kế thời trang, giày thể thao nam mang tính năng thoáng khí, giúp cân bằng nhiệt và độ ẩm trong những điều kiện môi trường khác nhau, đế có các đường rãnh chống trơn trượt.</p><p>▪︎ Sản phẩm sở hữu phong cách hiện đại, khỏe khoắn, màu sắc trẻ trung hợp với nhiều lứa tuổi và dáng người.</p><p>▪︎ Đường may tỉ mỉ, tinh tế tạo cho bạn cảm giác yên tâm về chất lượng.</p><p>▪︎ Sản phẩm có tính ứng dụng cao, mang khi tập luyện thể thao, đi làm hay đi chơi…</p><p>▪︎ Màu sắc: Xám - Xanh - Đen</p><p>Chất liệu: da PU kết hợp với đế cao su có thiết kế rãnh chống trợ trượt</p><p>&nbsp;</p><p>▪︎ Size: 39 - 43</p><p>size chiều dài chiều rộng</p><p>39 24.5 9.5-10</p><p>40 25 9.5-10</p><p>41 25.5 10</p><p>42 26 10-10.5</p><p>43 27 10.5</p><p>44 27.5 10.5-11</p>'),
(13, 11, 'Áo khoác nỉ form rộng mũ hai lớp', '<p>- Tên sp :Áo Hoodie Nữ Form Rộng Mũ 2 Lớp - Áo Khoác Hoodie DIEM oversize</p><p>- chất liêu : Nỉ cotton dày dặn</p><p>- kiểu dáng : năng động trẻ trung phong cách hàn quốc</p><p>- áo có hình in 3d siêu đẹp</p><p>- áo dài 70 rộng 60cm</p><p>- áo hoodie oversize nên không kén người mặc . che khuyết điểm cực kỳ tốt cho dù bạn mập hay ốm</p>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_options`
--

CREATE TABLE `product_options` (
  `PRODUCT_OPTION_ID` int(11) NOT NULL,
  `PRODUCT_VARIANT_ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_options`
--

INSERT INTO `product_options` (`PRODUCT_OPTION_ID`, `PRODUCT_VARIANT_ID`, `NAME`) VALUES
(2, 2, 'XL'),
(6, 2, 'XXL'),
(8, 2, 'L'),
(11, 6, '39'),
(12, 6, '40'),
(13, 6, '41'),
(14, 6, '42'),
(15, 11, 'Đen'),
(16, 11, 'Trắng'),
(17, 11, 'Kem');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variants`
--

CREATE TABLE `product_variants` (
  `PRODUCT_VARIANT_ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variants`
--

INSERT INTO `product_variants` (`PRODUCT_VARIANT_ID`, `NAME`) VALUES
(2, 'Áo nam'),
(6, 'Giày Nam'),
(11, 'Áo khoác');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `reviews`
--

CREATE TABLE `reviews` (
  `REVIEW_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `STAR` int(11) DEFAULT NULL,
  `COMMENT` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `reviews`
--

INSERT INTO `reviews` (`REVIEW_ID`, `USER_ID`, `PRODUCT_ID`, `STAR`, `COMMENT`) VALUES
(1, 1, 10, 4, 'GOOD'),
(2, 1, 11, 3, 'ok'),
(3, 1, 10, 5, 'ok');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sku`
--

CREATE TABLE `sku` (
  `SKU_ID` int(11) NOT NULL,
  `PRODUCT_OPTION_ID` int(11) NOT NULL,
  `PRODUCT_ID` int(11) NOT NULL,
  `PRICE` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sku`
--

INSERT INTO `sku` (`SKU_ID`, `PRODUCT_OPTION_ID`, `PRODUCT_ID`, `PRICE`) VALUES
(1, 11, 3, '55000.00'),
(2, 12, 3, '60002.00'),
(20, 2, 10, '90000.00'),
(21, 6, 10, '90000.00'),
(22, 8, 10, '80000.00'),
(23, 11, 11, '190000.00'),
(24, 12, 11, '200000.00'),
(25, 15, 13, '69000.00'),
(26, 16, 13, '68000.00'),
(27, 17, 13, '70000.00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `status`
--

CREATE TABLE `status` (
  `STATUS_ID` int(11) NOT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `status`
--

INSERT INTO `status` (`STATUS_ID`, `NAME`) VALUES
(1, 'Đang xử lý'),
(2, 'Đang giao'),
(3, 'Đã nhận'),
(4, 'Đã hủy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `USER_ID` int(11) NOT NULL,
  `USER_NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PASSWORD` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NAME` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `PHONE` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ADDRESS` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `IS_ADMIN` tinyint(1) DEFAULT NULL,
  `REFRESH_TOKEN` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`USER_ID`, `USER_NAME`, `PASSWORD`, `NAME`, `PHONE`, `ADDRESS`, `IS_ADMIN`, `REFRESH_TOKEN`) VALUES
(1, 'admin', '$2b$10$rv4PEheZil6f813yUM/XsOrDKBkDDuVjcScuIHw9zn8zv1uEmqwcS', 'Huỳnh Thanh Phú', '0987654321', 'Ninh Kiều, Cần Thơ', 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVTRVJfTkFNRSI6ImFkbWluIiwiVVNFUl9JRCI6MSwiSVNfQURNSU4iOjF9LCJpYXQiOjE3MDE0MTA1NjIsImV4cCI6MTcwNDAwMjU2Mn0.yS4G-4YjYsC7gEMaleHCVfZyRlFAdr6imxMtHLh_fkY'),
(26, 'admin2', '$2b$10$tiGXAIvEoU2EMtruzV8uZOLLFfTSPsWSHFarnFb/ay4Zj1znk0enm', 'phuhuynhThanh', '08888888', 'TV', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7IlVTRVJfTkFNRSI6ImFkbWluMiIsIlVTRVJfSUQiOjI2LCJJU19BRE1JTiI6MH0sImlhdCI6MTcwMTE2NDIzNCwiZXhwIjoxNzAzNzU2MjM0fQ.5QiKkPJIIIwU0LinDOaIUE0Dh5-ANQC70tc-AcsWpAg');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`IMAGE_ID`),
  ADD KEY `FK_RELATIONSHIP_1` (`PRODUCT_ID`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ORDER_ID`),
  ADD KEY `FK_RELATIONSHIP_10` (`STATUS_ID`),
  ADD KEY `FK_RELATIONSHIP_8` (`USER_ID`),
  ADD KEY `FK_RELATIONSHIP_9` (`SKU_ID`),
  ADD KEY `PRODUCT_ID` (`PRODUCT_ID`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`PRODUCT_ID`),
  ADD KEY `FK_RELATIONSHIP_4` (`PRODUCT_VARIANT_ID`);

--
-- Chỉ mục cho bảng `product_options`
--
ALTER TABLE `product_options`
  ADD PRIMARY KEY (`PRODUCT_OPTION_ID`),
  ADD KEY `FK_RELATIONSHIP_5` (`PRODUCT_VARIANT_ID`);

--
-- Chỉ mục cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`PRODUCT_VARIANT_ID`);

--
-- Chỉ mục cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`REVIEW_ID`),
  ADD KEY `FK_RELATIONSHIP_2` (`USER_ID`),
  ADD KEY `FK_RELATIONSHIP_3` (`PRODUCT_ID`);

--
-- Chỉ mục cho bảng `sku`
--
ALTER TABLE `sku`
  ADD PRIMARY KEY (`SKU_ID`),
  ADD KEY `FK_RELATIONSHIP_6` (`PRODUCT_ID`),
  ADD KEY `FK_RELATIONSHIP_7` (`PRODUCT_OPTION_ID`);

--
-- Chỉ mục cho bảng `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`STATUS_ID`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`USER_ID`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `IMAGE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `ORDER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `PRODUCT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `product_options`
--
ALTER TABLE `product_options`
  MODIFY `PRODUCT_OPTION_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `PRODUCT_VARIANT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `reviews`
--
ALTER TABLE `reviews`
  MODIFY `REVIEW_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `sku`
--
ALTER TABLE `sku`
  MODIFY `SKU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `status`
--
ALTER TABLE `status`
  MODIFY `STATUS_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `USER_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `FK_RELATIONSHIP_1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products` (`PRODUCT_ID`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_RELATIONSHIP_10` FOREIGN KEY (`STATUS_ID`) REFERENCES `status` (`STATUS_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_8` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_9` FOREIGN KEY (`SKU_ID`) REFERENCES `sku` (`SKU_ID`),
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products` (`PRODUCT_ID`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_RELATIONSHIP_4` FOREIGN KEY (`PRODUCT_VARIANT_ID`) REFERENCES `product_variants` (`PRODUCT_VARIANT_ID`);

--
-- Các ràng buộc cho bảng `product_options`
--
ALTER TABLE `product_options`
  ADD CONSTRAINT `FK_RELATIONSHIP_5` FOREIGN KEY (`PRODUCT_VARIANT_ID`) REFERENCES `product_variants` (`PRODUCT_VARIANT_ID`);

--
-- Các ràng buộc cho bảng `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`USER_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_3` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products` (`PRODUCT_ID`);

--
-- Các ràng buộc cho bảng `sku`
--
ALTER TABLE `sku`
  ADD CONSTRAINT `FK_RELATIONSHIP_6` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `products` (`PRODUCT_ID`),
  ADD CONSTRAINT `FK_RELATIONSHIP_7` FOREIGN KEY (`PRODUCT_OPTION_ID`) REFERENCES `product_options` (`PRODUCT_OPTION_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
