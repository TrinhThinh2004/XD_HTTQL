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
-- Table structure for table `shippers`
--

DROP TABLE IF EXISTS `shippers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shippers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `currentOrderId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shippers`
--

LOCK TABLES `shippers` WRITE;
/*!40000 ALTER TABLE `shippers` DISABLE KEYS */;
INSERT INTO `shippers` VALUES (1,'Thinh','0123456789','available',10.8657,106.619,'Trường Đại học Giao thông Vận tải TP.HCM - Cơ sở 3, 70, Đường Tô Ký, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh, 71716, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(2,'Ngân','0163254789','available',10.8464,106.772,'Thủ Đức, Nguyễn Văn Bá, Khu phố 2, Phường Thủ Đức, Thành phố Hồ Chí Minh, 00848, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(3,'Thành','0867 919 479','available',10.8581,106.615,'Hà Đặc, Phường Trung Mỹ Tây, Thành phố Hồ Chí Minh, 71716, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(4,'Khánh','0123456785','available',10.8092,106.673,'Chung cư Orchard Parkview Phú Nhuận, 130-132, Phường Đức Nhuận, Thành phố Hồ Chí Minh, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(5,'Minh','0123456987','available',10.8243,106.686,'Gò Vấp, Phường Hạnh Thông, Thành phố Hồ Chí Minh, 71400, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(6,'Tuấn','0369852147','available',10.8613,106.664,'Quận 12, Thành phố Hồ Chí Minh, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(7,'Khang','0123658974','available',10.7753,106.7,'Quận 1, Phường Bến Thành, Thành phố Hồ Chí Minh, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(8,'Phát','0123654879','available',10.8614,106.611,'Nguyễn Ảnh Thủ, Xã Bà Điểm, Thành phố Hồ Chí Minh, 71716, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(9,'Tiến','0231465897','available',10.8425,106.774,'Đường Hai Bà Trưng, Khu phố 7, Phường Tăng Nhơn Phú, Thành phố Hồ Chí Minh, 00848, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42'),(10,'Nhật','0236514789','available',10.8231,106.63,'Phan Huy ích, Phường Tây Thạnh, Thành phố Hồ Chí Minh, 71509, Việt Nam',NULL,'2025-09-19 13:17:42','2025-09-19 13:17:42');
/*!40000 ALTER TABLE `shippers` ENABLE KEYS */;
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
