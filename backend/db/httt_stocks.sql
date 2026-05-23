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
-- Table structure for table `stocks`
--

DROP TABLE IF EXISTS `stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productId` int DEFAULT NULL,
  `note` text,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `image` longblob,
  `category` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `description` text,
  `warehouseAddress` varchar(255) DEFAULT NULL,
  `warehouseLat` float DEFAULT NULL,
  `warehouseLng` float DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `minStock` int NOT NULL DEFAULT '10',
  `supplierId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Stocks_supplierId_foreign_idx` (`supplierId`),
  CONSTRAINT `Stocks_supplierId_foreign_idx` FOREIGN KEY (`supplierId`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stocks`
--

LOCK TABLES `stocks` WRITE;
/*!40000 ALTER TABLE `stocks` DISABLE KEYS */;
INSERT INTO `stocks` VALUES (1,NULL,'Nhập hàng tháng 1','Gạo ST25','Thực phẩm','25000',20001,_binary '/image/gao-st25.jpg','Gạo','kg','Còn hàng','Gạo ngon nhất thế giới','Kho Hà Nội',21.0278,105.834,0,'2025-09-19 13:17:42','2026-05-22 01:06:00',10,14),(2,NULL,'Nhập hàng tháng 10','Nước suối Lavie','Đồ uống','5000',100,_binary '/image/lavie-500ml-chai-moi-2.jpg','Nước uống','chai','Hết hàng','Nước suối tinh khiết','Kho HCM',10.7769,106.701,0,'2025-09-19 13:17:42','2026-05-20 19:24:19',10,13),(3,NULL,'Nhập hàng tháng 2','Mì tôm Hảo Hảo','Thực phẩm','4000',150,_binary '/image/mi-hao-hao-bun-mi-pho-viet-o-nhat-vietmart.jpg','Mì gói','gói','Còn hàng','Mì gói thơm ngon','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2026-05-20 19:50:38',10,20),(4,NULL,'Nhập hàng tháng 3','Sữa Vinamilk','Đồ uống','20000',120,_binary '/image/sua-vinamilk.jpg','Sữa','chai','Còn hàng','Sữa tươi sạch','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(5,NULL,'Nhập hàng tháng 3','Trứng gà Ta','Thực phẩm','3000',1500,_binary '/image/trung-ga-ta.jpg','Trứng','quả','Còn hàng','Trứng gà ta thượng hạng','Kho Hà Nội',21.026,105.834,0,'2025-09-19 13:17:42','2026-05-20 19:52:45',10,5),(6,NULL,'Nhập hàng tháng 3','Bánh mì','Thực phẩm','15000',80,_binary '/image/banh-mi.jpg','Bánh','cái','Còn hàng','Bánh mì nóng hổi','Kho HCM',10.775,106.699,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(7,NULL,'Nhập hàng tháng 1','Cafe Trung Nguyên','Đồ uống','40000',60,_binary '/image/cafe-trung-nguyen.jpg','Cafe','gói','Còn hàng','Cafe nguyên chất','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2026-05-22 01:06:15',10,1),(8,NULL,'Nhập hàng tháng 1','Nước ngọt Coca','Đồ uống','10000',300,_binary '/image/coca.jpg','Nước uống','lon','Còn hàng','Nước ngọt có gas','Kho HCM',10.778,106.702,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(9,NULL,'Nhập hàng tháng 1','Bánh quy','Thực phẩm','25000',90,_binary '/image/banh-quy.jpeg','Bánh','gói','Còn hàng','Bánh quy giòn ngon','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(10,NULL,'Nhập hàng tháng 1','Phở khô','Thực phẩm','30000',70,_binary '/image/pho-kho.jpg','Mì gói','gói','Còn hàng','Phở khô ngon miệng','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(11,NULL,'Nhập hàng tháng 11','Gạo tám thơm','Thực phẩm','22000',120,_binary '/image/gao-tam-thom.jpg','Gạo','kg','Còn hàng','Gạo thơm ngon','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(12,NULL,'Nhập hàng tháng 4','Sữa Ông Thọ','Đồ uống','18000',90,_binary '/image/sua-ong-tho.jpg','Sữa','lon','Còn hàng','Sữa đặc có đường','Kho HCM',10.779,106.703,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(13,NULL,'Nhập hàng tháng 4','Mì gói Acecook','Thực phẩm','4500',150,_binary '/image/mi-acecook.jpg','Mì gói','gói','Còn hàng','Mì ngon tiện lợi','Kho Hà Nội',21.027,105.834,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(14,NULL,'Nhập hàng tháng 5','Nước ép cam','Đồ uống','12000',80,_binary '/image/nuoc-cam.jpg','Nước ép','chai','Còn hàng','Nước ép cam tươi','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(15,NULL,'Nhập hàng tháng 5','Trà Lipton','Đồ uống','15000',100,_binary '/image/tra-lipton.jpg','Trà','gói','Còn hàng','Trà Lipton thơm ngon','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(16,NULL,'Nhập hàng tháng 7','Bánh chưng','Thực phẩm','50000',61,_binary '/image/banh-chung.jpg','Bánh','cái','Còn hàng','Bánh chưng truyền thống','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2026-05-20 20:22:09',10,12),(17,NULL,'Nhập hàng tháng 9','Mật ong rừng','Thực phẩm','120000',40,_binary '/image/mat-ong-rung.jpg','Thực phẩm','chai','Còn hàng','Mật ong nguyên chất','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(18,NULL,'Nhập hàng tháng 6','Nước tăng lực Red Bull','Đồ uống','20000',90,_binary '/image/nuoc-tang-luc-redbull.jpg','Nước uống','lon','Còn hàng','Nước tăng lực','Kho HCM',10.779,106.702,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(19,NULL,'Nhập hàng tháng 6','Bánh su kem','Thực phẩm','10000',120,_binary '/image/banh-su-kem.jpg','Bánh','cái','Còn hàng','Bánh su kem thơm ngon','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(20,NULL,'Nhập hàng tháng 3','Cà phê phin','Đồ uống','35000',70,_binary '/image/cafe-phin.jpeg','Cafe','gói','Còn hàng','Cà phê phin nguyên chất','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(21,NULL,'Nhập hàng tháng 2','Sữa chua Vinamilk','Đồ uống','5000',150,_binary '/image/sua-chua-vinamilk.jpg','Sữa chua','hộp','Còn hàng','Sữa chua mát lành','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(22,NULL,'Nhập hàng tháng 3','Gạo Nhật','Thực phẩm','40000',80,_binary '/image/gao-Japonica.jpg','Gạo','kg','Còn hàng','Gạo Nhật thơm ngon','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(23,NULL,'Nhập hàng tháng 5','Nước cam vắt','Đồ uống','15000',60,_binary '/image/nuoc-cam.jpg','Nước ép','chai','Còn hàng','Nước cam tươi nguyên chất','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(24,NULL,'Nhập hàng tháng 5','Bánh gato','Thực phẩm','200000',20,_binary '/image/gato-cake.jpg','Bánh','cái','Còn hàng','Bánh gato sinh nhật','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(25,NULL,'Nhập hàng tháng 10','Mì Ý','Thực phẩm','35000',90,_binary '/image/mi-y.jpg','Mì','gói','Còn hàng','Mì Ý ngon','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(26,NULL,'Nhập hàng tháng 12','Bột ngũ cốc','Thực phẩm','40000',70,_binary '/image/bot-ngu-coc.jpg','Ngũ cốc','kg','Còn hàng','Bột ngũ cốc dinh dưỡng','Kho HCM',10.775,106.699,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(27,NULL,'Nhập hàng tháng 12','Cà phê hòa tan','Đồ uống','25000',120,_binary '/image/ca-phe-hoa-tan.jpg','Cafe','gói','Còn hàng','Cafe hòa tan tiện lợi','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(28,NULL,'Nhập hàng tháng 11','Trà Thái Nguyên','Đồ uống','30000',80,_binary '/image/tra-thai-nguyen.jpg','Trà','gói','Còn hàng','Trà xanh Thái Nguyên','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(29,NULL,'Nhập hàng tháng 7','Bánh bông lan','Thực phẩm','12000',100,_binary '/image/banh-bong-lan.jpg','Bánh','cái','Còn hàng','Bánh bông lan mềm mại','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(30,NULL,'Nhập hàng tháng 6','Sữa tươi TH','Đồ uống','18000',140,_binary '/image/sua-th.jpg','Sữa','chai','Còn hàng','Sữa tươi sạch','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(31,NULL,'Nhập hàng tháng 10','Gạo nếp cái hoa vàng','Thực phẩm','30000',60,_binary '/image/nep-bac-nep-cai-hoa-vang.jpg','Gạo','kg','Còn hàng','Gạo nếp thơm','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(32,NULL,'Nhập hàng tháng 12','Bánh tét','Thực phẩm','60000',50,_binary '/image/banh-tet.jpg','Bánh','cái','Còn hàng','Bánh tét truyền thống','Kho HCM',10.775,106.699,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(33,NULL,'Nhập hàng tháng 11','Nước ép táo','Đồ uống','12000',90,_binary '/image/nuoc-ep-tao.jpg','Nước ép','chai','Còn hàng','Nước ép táo tươi','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(34,NULL,'Nhập hàng tháng 11','Cà phê sữa đá','Đồ uống','25000',70,_binary '/image/ca-phe-sua-da.png','Cafe','ly','Còn hàng','Cà phê sữa đá truyền thống','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(35,NULL,'Nhập hàng tháng 1','Bánh mì que','Thực phẩm','12000',80,_binary '/image/banh-mi-que.jpg','Bánh','cái','Còn hàng','Bánh mì que giòn ngon','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(36,NULL,'Nhập hàng tháng 1','Sữa đặc Vinamilk','Đồ uống','18000',100,_binary '/image/sua-dac-vinamilk.jpg','Sữa','lon','Còn hàng','Sữa đặc có đường','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(37,NULL,'Nhập hàng tháng 1','Bánh trung thu','Thực phẩm','80000',40,_binary '/image/banh-trung-thu.jpg','Bánh','cái','Còn hàng','Bánh trung thu cao cấp','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(38,NULL,'Nhập hàng tháng 1','Trà sữa','Đồ uống','30000',90,_binary '/image/tra-sua.jpg','Đồ uống','ly','Còn hàng','Trà sữa thơm ngon','Kho HCM',10.775,106.699,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(39,NULL,'Nhập hàng tháng 1','Bánh pizza','Thực phẩm','120000',30,_binary '/image/banh-pizza.jpg','Bánh','cái','Còn hàng','Pizza nóng hổi','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(40,NULL,'Nhập hàng tháng 2','Nước ép dứa','Đồ uống','12000',70,_binary '/image/nuoc-ep-dua.jpg','Nước ép','chai','Còn hàng','Nước ép dứa tươi','Kho Hà Nội',21.029,105.836,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(41,NULL,'Nhập hàng tháng 4','Bánh mochi','Thực phẩm','20000',60,_binary '/image/banh-mochi.jpg','Bánh','cái','Còn hàng','Bánh mochi mềm mại','Kho HCM',10.776,106.7,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(42,NULL,'Nhập hàng tháng 1','Trà xanh Matcha','Đồ uống','25000',50,_binary '/image/matcha-da-xay.jpg','Trà','gói','Còn hàng','Trà xanh matcha Nhật Bản','Kho Hà Nội',21.027,105.833,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(43,NULL,'Nhập hàng tháng 1','Mì ăn liền Kokomi','Thực phẩm','5000',200,_binary '/image/kokomi.jpg','Mì gói','gói','Còn hàng','Mì ăn liền tiện lợi','Kho HCM',10.775,106.699,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(44,NULL,'Nhập hàng tháng 1','Nước tăng lực Sting','Đồ uống','12000',90,_binary '/image/sting.jpg','Nước uống','lon','Còn hàng','Nước tăng lực','Kho Hà Nội',21.028,105.835,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL),(45,NULL,'Nhập hàng tháng 1','Bánh tart trứng','Thực phẩm','25000',50,_binary '/image/banh-tart-trung.jpg','Bánh','cái','Còn hàng','Bánh tart trứng mềm','Kho HCM',10.777,106.701,0,'2025-09-19 13:17:42','2025-09-19 13:17:42',10,NULL);
/*!40000 ALTER TABLE `stocks` ENABLE KEYS */;
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
