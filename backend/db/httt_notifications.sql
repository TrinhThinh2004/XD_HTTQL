-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: httt
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text,
  `userId` int DEFAULT NULL,
  `read` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (7,'info','? HỆ THỐNG ĐÃ NÂNG CẤP LÊN V3.0.0','Chào mừng bạn đến với Smart WMS v3.0.0! Bản cập nhật này mang đến những thay đổi lớn về bảo mật và trải nghiệm:\n\n1. ?️ Bảo mật đa lớp (MFA): Hỗ trợ Google Authenticator và Microsoft Authenticator.\n2. ? Mã PIN bảo mật: Thêm lớp bảo vệ thứ hai cho các thao tác quan trọng.\n3. ? Quản lý phiên làm việc: Theo dõi và đăng xuất từ xa các thiết bị đang truy cập tài khoản.\n4. ✨ Giao diện mới: Đồng bộ hóa Dark/Light mode và tối ưu hóa trải nghiệm người dùng.\n5. ? Kiểm soát quyền hạn: Phân quyền chặt chẽ giữa Admin và Nhân viên.\n\nCảm ơn bạn đã tin dùng hệ thống của chúng tôi!',NULL,1,'2026-05-22 10:20:29','2026-05-22 10:22:17'),(8,'system','? Chào mừng đến với Smart WMS v3.5.0!','Phiên bản v3.5.0 mang đến hàng loạt cải tiến vượt trội: \n\n✅ **Lịch sử hoạt động:** Theo dõi mọi biến động kho bãi theo thời gian thực.\n✅ **Quản lý Xuất kho nâng cao:** Giao diện bento hiện đại, chọn nhiều mặt hàng, kiểm tra tồn kho tức thì.\n✅ **Bảo mật tối ưu:** Lưu trữ Avatar bằng Base64 (LONGTEXT), hỗ trợ 2FA và mã PIN.\n✅ **Dữ liệu thực:** Các biểu đồ thống kê hiện đã kết nối trực tiếp với Database.\n✅ **Trải nghiệm mượt mà:** Tối ưu hóa hiệu năng và thu gọn các phím điều hướng hệ thống.\n\nKhám phá ngay các tính năng mới trong bảng điều khiển của bạn!',1,1,'2026-05-23 14:51:26','2026-05-23 14:53:38');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-23 15:29:43
