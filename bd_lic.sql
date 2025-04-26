-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.7.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.10.0.7000
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for db_licenta
CREATE DATABASE IF NOT EXISTS `db_licenta` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `db_licenta`;

-- Dumping structure for table db_licenta.donations
CREATE TABLE IF NOT EXISTS `donations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `donorId` int(11) NOT NULL,
  `type` enum('clothing','money','food','medicine','other') NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.donations: ~0 rows (approximately)

-- Dumping structure for table db_licenta.elderprofiles
CREATE TABLE IF NOT EXISTS `elderprofiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `birthDate` date NOT NULL,
  `description` text NOT NULL,
  `clothingSize` varchar(255) DEFAULT NULL,
  `shoeSize` varchar(255) DEFAULT NULL,
  `hasPair` tinyint(1) NOT NULL DEFAULT 0,
  `needs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`needs`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.elderprofiles: ~0 rows (approximately)

-- Dumping structure for table db_licenta.events
CREATE TABLE IF NOT EXISTS `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.events: ~0 rows (approximately)

-- Dumping structure for table db_licenta.grandparentconnections
CREATE TABLE IF NOT EXISTS `grandparentconnections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `volunteerId` int(11) NOT NULL,
  `elderId` int(11) NOT NULL,
  `startDate` date NOT NULL,
  `notes` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.grandparentconnections: ~0 rows (approximately)

-- Dumping structure for table db_licenta.stats
CREATE TABLE IF NOT EXISTS `stats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `eldersHelped` int(11) DEFAULT 0,
  `totalDonations` int(11) DEFAULT 0,
  `activeVolunteers` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.stats: ~0 rows (approximately)

-- Dumping structure for table db_licenta.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` enum('elder','elder_helper','volunteer','ngo','admin') NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `hasPairedElder` tinyint(1) DEFAULT NULL,
  `totalEldersAdopted` int(11) DEFAULT 0,
  `eventsAttended` int(11) DEFAULT 0,
  `isActive` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username_2` (`username`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

-- Dumping data for table db_licenta.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `role`, `name`, `username`, `email`, `password`, `phoneNumber`, `city`, `hasPairedElder`, `totalEldersAdopted`, `eventsAttended`, `isActive`, `createdAt`, `updatedAt`) VALUES
	(1, 'elder', 'Ion Popescu', 'ionpop', 'ion@example.com', '$2b$10$CIehpqgcpgaeb9wb1G1ML.QLxrffbqN4GyDooG1.E23ta9vrmyVOq', NULL, 'Cluj', NULL, 0, 0, NULL, '2025-04-23 18:00:03', '2025-04-23 18:00:03');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
