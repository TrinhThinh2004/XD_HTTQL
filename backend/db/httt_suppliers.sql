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
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` longblob,
  `description` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Công ty TNHH Thực phẩm An Bình','0901234567','Hà Nội',_binary 'supplier-a.jpg','Chuyên cung cấp thực phẩm tươi','2025-09-19 13:17:42','2025-09-19 13:17:42'),(2,'Công ty TNHH Đồ uống Sài Gòn','0907654321','TP.HCM',_binary 'supplier-b.jpg','Chuyên cung cấp nước giải khát','2025-09-19 13:17:42','2025-09-19 13:17:42'),(3,'Công ty TNHH Hải sản Phương Nam','0901111222','Đà Nẵng',_binary 'supplier-c.jpg','Chuyên cung cấp hải sản tươi sống','2025-09-19 13:17:42','2025-09-19 13:17:42'),(4,'Công ty TNHH Rau củ Xanh','0903333444','Hải Phòng',_binary 'supplier-d.jpg','Chuyên cung cấp rau củ sạch','2025-09-19 13:17:42','2025-09-19 13:17:42'),(5,'Công ty TNHH Thực phẩm Ngọc Mai','0905555666','Cần Thơ',_binary 'supplier-e.jpg','Chuyên cung cấp thực phẩm chế biến','2025-09-19 13:17:42','2025-09-19 13:17:42'),(6,'Công ty TNHH Bánh kẹo Hương Việt','0907777888','Hà Nội',_binary 'supplier-f.jpg','Chuyên cung cấp bánh kẹo','2025-09-19 13:17:42','2025-09-19 13:17:42'),(7,'Công ty TNHH Nước ép Trái cây','0909999000','TP.HCM',_binary 'supplier-g.jpg','Chuyên cung cấp nước ép trái cây tươi','2025-09-19 13:17:42','2025-09-19 13:17:42'),(8,'Công ty TNHH Sữa Việt','0901212121','Đà Nẵng',_binary 'supplier-h.jpg','Chuyên cung cấp sữa và sản phẩm từ sữa','2025-09-19 13:17:42','2025-09-19 13:17:42'),(9,'Công ty TNHH Cafe Rang Xay','0903434343','Hải Phòng',_binary 'supplier-i.jpg','Chuyên cung cấp cafe rang xay','2025-09-19 13:17:42','2025-09-19 13:17:42'),(10,'Công ty TNHH Mì ăn liền Kokomi','0905656565','Cần Thơ',_binary 'supplier-j.jpg','Chuyên cung cấp mì ăn liền','2025-09-19 13:17:42','2025-09-19 13:17:42'),(11,'Công ty TNHH Bánh Pizza Italia','0907878787','Hà Nội',_binary 'supplier-k.jpg','Chuyên cung cấp pizza đông lạnh','2025-09-19 13:17:42','2025-09-19 13:17:42'),(12,'Công ty TNHH Trà Matcha Nhật Bản','0909090909','TP.HCM',_binary 'supplier-l.jpg','Chuyên cung cấp trà xanh matcha','2025-09-19 13:17:42','2025-09-19 13:17:42'),(13,'Công ty TNHH Nước suối Lavie','0910101010','Đà Nẵng',_binary 'supplier-m.jpg','Chuyên cung cấp nước suối tinh khiết','2025-09-19 13:17:42','2025-09-19 13:17:42'),(14,'Công ty TNHH Thực phẩm ST25','0912121212','Hải Phòng',_binary 'supplier-n.jpg','Chuyên cung cấp gạo ST25','2025-09-19 13:17:42','2025-09-19 13:17:42'),(15,'Công ty TNHH Bánh Mochi Nhật','0914141414','Cần Thơ',_binary 'supplier-o.jpg','Chuyên cung cấp bánh mochi','2025-09-19 13:17:42','2025-09-19 13:17:42'),(16,'Công ty TNHH Trái cây Miền Tây','0916161616','Hà Nội',_binary 'supplier-p.jpg','Chuyên cung cấp trái cây tươi','2025-09-19 13:17:42','2025-09-19 13:17:42'),(17,'Công ty TNHH Thực phẩm Minh Khang','0918181818','TP.HCM',_binary 'supplier-q.jpg','Chuyên cung cấp thực phẩm chế biến','2025-09-19 13:17:42','2025-09-19 13:17:42'),(18,'Công ty TNHH Nước tăng lực Sting','0920202020','Đà Nẵng',_binary 'supplier-r.jpg','Chuyên cung cấp nước tăng lực','2025-09-19 13:17:42','2025-09-19 13:17:42'),(19,'Công ty TNHH Bánh Tart Trứng','0922222222','Hải Phòng',_binary 'supplier-s.jpg','Chuyên cung cấp bánh tart trứng','2025-09-19 13:17:42','2025-09-19 13:17:42'),(20,'Công ty TNHH Mì Hảo Hảo','0924242424','Cần Thơ',_binary 'supplier-t.jpg','Chuyên cung cấp mì gói Hảo Hảo','2025-09-19 13:17:42','2025-09-19 13:17:42'),(22,'THHM','934230-4','ểwrwerwer',NULL,'rewrewr','2026-05-23 14:12:57','2026-05-23 14:12:57');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
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
