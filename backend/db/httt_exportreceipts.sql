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
-- Table structure for table `exportreceipts`
--

DROP TABLE IF EXISTS `exportreceipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exportreceipts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  `export_date` datetime DEFAULT NULL,
  `reason` text,
  `note` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exportreceipts`
--

LOCK TABLES `exportreceipts` WRITE;
/*!40000 ALTER TABLE `exportreceipts` DISABLE KEYS */;
INSERT INTO `exportreceipts` VALUES (1,1,'2025-09-19 13:17:42','Xuất hàng để giao khách','Giao gấp trong ngày','2025-09-19 13:17:42','2025-09-19 13:17:42'),(2,2,'2025-09-19 13:17:42','Xuất hàng chuyển kho','Chuyển sang kho chi nhánh B','2025-09-19 13:17:42','2025-09-19 13:17:42'),(3,3,'2025-09-19 13:17:42','Xuất hàng khuyến mãi','Dùng cho chương trình tặng quà','2025-09-19 13:17:42','2025-09-19 13:17:42'),(4,1,'2025-09-19 13:17:42','Xuất trả hàng','Khách trả hàng lỗi','2025-09-19 13:17:42','2025-09-19 13:17:42'),(5,2,'2025-09-19 13:17:42','Xuất hàng online','Giao đơn hàng online','2025-09-19 13:17:42','2025-09-19 13:17:42'),(6,3,'2025-09-19 13:17:42','Xuất kho chi nhánh C','Bổ sung hàng cho chi nhánh','2025-09-19 13:17:42','2025-09-19 13:17:42'),(7,1,'2025-09-19 13:17:42','Xuất mẫu thử','Gửi mẫu cho khách hàng thử sản phẩm','2025-09-19 13:17:42','2025-09-19 13:17:42'),(8,2,'2025-09-19 13:17:42','Xuất hàng gấp','Khẩn cấp giao khách VIP','2025-09-19 13:17:42','2025-09-19 13:17:42'),(9,3,'2025-09-19 13:17:42','Xuất hàng dự án','Dùng cho dự án hợp tác','2025-09-19 13:17:42','2025-09-19 13:17:42'),(10,1,'2025-09-19 13:17:42','Xuất kho Hà Nội','Bổ sung cho kho chi nhánh HCM','2025-09-19 13:17:42','2025-09-19 13:17:42'),(11,2,'2025-09-19 13:17:42','Xuất hàng sự kiện','Chuẩn bị cho hội chợ','2025-09-19 13:17:42','2025-09-19 13:17:42'),(12,3,'2025-09-19 13:17:42','Xuất hàng nội bộ','Sử dụng trong công ty','2025-09-19 13:17:42','2025-09-19 13:17:42'),(13,1,'2025-09-19 13:17:42','Xuất hàng khuyến mãi tháng 8','Tặng quà khách VIP','2025-09-19 13:17:42','2025-09-19 13:17:42'),(14,2,'2025-09-19 13:17:42','Xuất hàng Tết','Chuẩn bị cho dịp Tết','2025-09-19 13:17:42','2025-09-19 13:17:42'),(15,3,'2025-09-19 13:17:42','Xuất hàng cuối tháng','Thanh lý tồn kho','2025-09-19 13:17:42','2025-09-19 13:17:42'),(16,1,'2025-09-19 13:17:42','Xuất hàng quà tặng','Dùng cho đối tác','2025-09-19 13:17:42','2025-09-19 13:17:42'),(17,2,'2025-09-19 13:17:42','Xuất hàng trả lại NCC','Hàng lỗi trả lại nhà cung cấp','2025-09-19 13:17:42','2025-09-19 13:17:42'),(18,3,'2025-09-19 13:17:42','Xuất kho chi nhánh D','Bổ sung hàng chi nhánh D','2025-09-19 13:17:42','2025-09-19 13:17:42'),(19,1,'2025-09-19 13:17:42','Xuất hàng khẩn cấp','Giao ngay cho khách VIP','2025-09-19 13:17:42','2025-09-19 13:17:42'),(20,2,'2025-09-19 13:17:42','Xuất hàng mẫu','Gửi mẫu cho khách mới','2025-09-19 13:17:42','2025-09-19 13:17:42');
/*!40000 ALTER TABLE `exportreceipts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-23 15:29:44
