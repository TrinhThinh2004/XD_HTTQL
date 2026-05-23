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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `orderCount` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'nguyễnvăna1@example.com','Nguyễn Văn A','0967555267','Đường số 1, Quận 2, TP.HCM',10.7468,106.651,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(2,'nguyễnthịf2@example.com','Nguyễn Thị F','0979120851','Đường số 2, Quận 3, TP.HCM',10.8348,106.623,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(3,'đỗvăna3@example.com','Đỗ Văn A','0924737727','Đường số 3, Quận 4, TP.HCM',10.8291,106.644,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(4,'trầnvănc4@example.com','Trần Văn C','0958971770','Đường số 4, Quận 5, TP.HCM',10.8245,106.645,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(5,'đặngvăne5@example.com','Đặng Văn E','0922535935','Đường số 5, Quận 6, TP.HCM',10.845,106.668,10,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(6,'phạmthịh6@example.com','Phạm Thị H','0969436638','Đường số 6, Quận 7, TP.HCM',10.8187,106.68,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(7,'đặngvăna7@example.com','Đặng Văn A','0964277965','Đường số 7, Quận 8, TP.HCM',10.7865,106.721,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(8,'lêvăna8@example.com','Lê Văn A','0920043834','Đường số 8, Quận 9, TP.HCM',10.7684,106.749,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(9,'hoàngthịf9@example.com','Hoàng Thị F','0911071939','Đường số 9, Quận 10, TP.HCM',10.7104,106.632,3,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(10,'phạmthịh10@example.com','Phạm Thị H','0980760250','Đường số 10, Quận 1, TP.HCM',10.7835,106.647,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(11,'phanthịd11@example.com','Phan Thị D','0919326126','Đường số 11, Quận 2, TP.HCM',10.8247,106.656,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(12,'đặngthịh12@example.com','Đặng Thị H','0920448484','Đường số 12, Quận 3, TP.HCM',10.7447,106.682,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(13,'hoàngthịf13@example.com','Hoàng Thị F','0951234699','Đường số 13, Quận 4, TP.HCM',10.7585,106.744,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(14,'trầnthịh14@example.com','Trần Thị H','0999130707','Đường số 14, Quận 5, TP.HCM',10.7576,106.649,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(15,'đỗthịf15@example.com','Đỗ Thị F','0975323749','Đường số 15, Quận 6, TP.HCM',10.7776,106.635,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(16,'phạmthịh16@example.com','Phạm Thị H','0975077387','Đường số 16, Quận 7, TP.HCM',10.8237,106.748,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(17,'phanthịf17@example.com','Phan Thị F','0936769523','Đường số 17, Quận 8, TP.HCM',10.7946,106.722,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(18,'đỗthịh18@example.com','Đỗ Thị H','0954963802','Đường số 18, Quận 9, TP.HCM',10.7542,106.749,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(19,'trầnvăna19@example.com','Trần Văn A','0916615250','Đường số 19, Quận 10, TP.HCM',10.8346,106.647,3,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(20,'hoàngthịf20@example.com','Hoàng Thị F','0976221034','Đường số 20, Quận 1, TP.HCM',10.7387,106.722,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(21,'lêthịf21@example.com','Lê Thị F','0938653157','Đường số 21, Quận 2, TP.HCM',10.7666,106.648,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(22,'bùithịb22@example.com','Bùi Thị B','0953434542','Đường số 22, Quận 3, TP.HCM',10.7795,106.628,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(23,'đỗthịd23@example.com','Đỗ Thị D','0969391188','Đường số 23, Quận 4, TP.HCM',10.8042,106.71,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(24,'phanthịf24@example.com','Phan Thị F','0953411715','Đường số 24, Quận 5, TP.HCM',10.7888,106.69,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(25,'đặngthịf25@example.com','Đặng Thị F','0956201743','Đường số 25, Quận 6, TP.HCM',10.8357,106.684,3,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(26,'trầnvănj26@example.com','Trần Văn J','0976287934','Đường số 26, Quận 7, TP.HCM',10.7845,106.69,3,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(27,'nguyễnvăne27@example.com','Nguyễn Văn E','0928010199','Đường số 27, Quận 8, TP.HCM',10.8433,106.607,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(28,'phanvănj28@example.com','Phan Văn J','0947802304','Đường số 28, Quận 9, TP.HCM',10.7825,106.629,8,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(29,'đặngvăna29@example.com','Đặng Văn A','0976493068','Đường số 29, Quận 10, TP.HCM',10.8357,106.731,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(30,'bùivăna30@example.com','Bùi Văn A','0996942865','Đường số 30, Quận 1, TP.HCM',10.7975,106.715,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(31,'phạmvăne31@example.com','Phạm Văn E','0984744496','Đường số 31, Quận 2, TP.HCM',10.7092,106.696,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(32,'nguyễnvăna32@example.com','Nguyễn Văn A','0944290619','Đường số 32, Quận 3, TP.HCM',10.715,106.626,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(33,'bùivănc33@example.com','Bùi Văn C','0987930201','Đường số 33, Quận 4, TP.HCM',10.8478,106.743,7,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(34,'vũvăna34@example.com','Vũ Văn A','0916415273','Đường số 34, Quận 5, TP.HCM',10.7814,106.748,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(35,'trầnvănc35@example.com','Trần Văn C','0929691698','Đường số 35, Quận 6, TP.HCM',10.7256,106.74,8,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(36,'đỗvăng36@example.com','Đỗ Văn G','0953743354','Đường số 36, Quận 7, TP.HCM',10.7373,106.642,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(37,'phạmvănc37@example.com','Phạm Văn C','0912455434','Đường số 37, Quận 8, TP.HCM',10.7727,106.702,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(38,'phanthịi38@example.com','Phan Thị I','0968695452','Đường số 38, Quận 9, TP.HCM',10.7274,106.636,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(39,'hoàngthịh39@example.com','Hoàng Thị H','0998120322','Đường số 39, Quận 10, TP.HCM',10.8057,106.654,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(40,'vũthịi40@example.com','Vũ Thị I','0999199927','Đường số 40, Quận 1, TP.HCM',10.813,106.681,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(41,'đỗvănc41@example.com','Đỗ Văn C','0948475523','Đường số 41, Quận 2, TP.HCM',10.8229,106.628,4,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(42,'phạmvăna42@example.com','Phạm Văn A','0978525962','Đường số 42, Quận 3, TP.HCM',10.7132,106.642,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(43,'hoàngvăng43@example.com','Hoàng Văn G','0922171626','Đường số 43, Quận 4, TP.HCM',10.7948,106.682,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(44,'lêthịf44@example.com','Lê Thị F','0997882076','Đường số 44, Quận 5, TP.HCM',10.7758,106.743,7,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(45,'trầnthịb45@example.com','Trần Thị B','0913025585','Đường số 45, Quận 6, TP.HCM',10.8303,106.729,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(46,'vũvăna46@example.com','Vũ Văn A','0950021086','Đường số 46, Quận 7, TP.HCM',10.8191,106.704,6,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(47,'đỗthịh47@example.com','Đỗ Thị H','0991434061','Đường số 47, Quận 8, TP.HCM',10.8221,106.666,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(48,'phanvănj48@example.com','Phan Văn J','0922594617','Đường số 48, Quận 9, TP.HCM',10.7726,106.617,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(49,'đặngvănj49@example.com','Đặng Văn J','0974287934','Đường số 49, Quận 10, TP.HCM',10.8164,106.694,5,'2024-01-01 15:00:00','2024-01-02 15:00:00'),(50,'vũvănj50@example.com','Vũ Văn J','0966735443','Đường số 50, Quận 1, TP.HCM',10.8073,106.693,5,'2024-01-01 15:00:00','2024-01-02 15:00:00');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
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
