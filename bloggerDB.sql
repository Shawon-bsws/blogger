-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.39 - MySQL Community Server - GPL
-- Server OS:                    Linux
-- HeidiSQL Version:             12.7.0.6850
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for bloggerdb
DROP DATABASE IF EXISTS `bloggerdb`;
CREATE DATABASE IF NOT EXISTS `bloggerdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bloggerdb`;

-- Dumping structure for table bloggerdb.blog_comment_maps
DROP TABLE IF EXISTS `blog_comment_maps`;
CREATE TABLE IF NOT EXISTS `blog_comment_maps` (
  `blog_comment_map_id` int NOT NULL AUTO_INCREMENT,
  `comment_master_id` int DEFAULT NULL,
  `blog_master_id` int DEFAULT NULL,
  PRIMARY KEY (`blog_comment_map_id`),
  KEY `blog_master_id` (`blog_master_id`),
  KEY `comment_master_id` (`comment_master_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bloggerdb.blog_comment_maps: ~0 rows (approximately)
DELETE FROM `blog_comment_maps`;

-- Dumping structure for table bloggerdb.blog_masters
DROP TABLE IF EXISTS `blog_masters`;
CREATE TABLE IF NOT EXISTS `blog_masters` (
  `blog_master_id` int NOT NULL AUTO_INCREMENT,
  `user_master_id` int DEFAULT NULL,
  `blog_title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `blog_detail` longtext COLLATE utf8mb4_general_ci,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  `deleted` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`blog_master_id`),
  KEY `user_master_id` (`user_master_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bloggerdb.blog_masters: ~1 rows (approximately)
DELETE FROM `blog_masters`;
INSERT INTO `blog_masters` (`blog_master_id`, `user_master_id`, `blog_title`, `blog_detail`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 1, 'Testing Blog Creation', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', '2024-10-13 16:54:36', NULL, 'N');

-- Dumping structure for table bloggerdb.comment_masters
DROP TABLE IF EXISTS `comment_masters`;
CREATE TABLE IF NOT EXISTS `comment_masters` (
  `comment_master_id` int NOT NULL AUTO_INCREMENT,
  `user_master_id` int DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  `deleted` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`comment_master_id`),
  KEY `user_master_id` (`user_master_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bloggerdb.comment_masters: ~0 rows (approximately)
DELETE FROM `comment_masters`;

-- Dumping structure for table bloggerdb.user_masters
DROP TABLE IF EXISTS `user_masters`;
CREATE TABLE IF NOT EXISTS `user_masters` (
  `user_master_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  `deleted` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`user_master_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bloggerdb.user_masters: ~0 rows (approximately)
DELETE FROM `user_masters`;
INSERT INTO `user_masters` (`user_master_id`, `user_name`, `user_email`, `user_password`, `created_at`, `updated_at`, `deleted`) VALUES
	(1, 'Peter Anderson', 'abc@xyz.com', '$2b$10$57JSR5QTRH2KDiJO7l6UTOVsGIy5c1kx5LFKOSJTQt.JmIHHsfAuy', '2024-10-13 16:04:17', NULL, 'N');

-- Dumping structure for table bloggerdb.user_sessions
DROP TABLE IF EXISTS `user_sessions`;
CREATE TABLE IF NOT EXISTS `user_sessions` (
  `user_session_id` int NOT NULL AUTO_INCREMENT,
  `user_master_id` int DEFAULT NULL,
  `user_token` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime DEFAULT NULL,
  `is_active` enum('Y','N') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Y',
  PRIMARY KEY (`user_session_id`) USING BTREE,
  KEY `user_master_id` (`user_master_id`),
  KEY `user_token` (`user_token`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table bloggerdb.user_sessions: ~5 rows (approximately)
DELETE FROM `user_sessions`;
INSERT INTO `user_sessions` (`user_session_id`, `user_master_id`, `user_token`, `created_at`, `updated_at`, `is_active`) VALUES
	(1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM2Mzk3LCJleHAiOjE3MjkwMDkxOTd9.JN0KUtmD4-2yP4Jva1Ssh3kVw6IhKcrNU8OeozXSuq8', '2024-10-13 16:19:57', '2024-10-13 16:30:42', 'N'),
	(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM3MDQyLCJleHAiOjE3MjkwMDk4NDJ9.oCAw-8YmZLl30GNkZqPZKbpvVUdJjSX8bLxvEk_BylU', '2024-10-13 16:30:42', '2024-10-13 16:33:11', 'N'),
	(3, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM3MTkxLCJleHAiOjE3MjkwMDk5OTF9.8ffKhbokday2jEdu-ev5V6p85HENamtG-6KWWk9uuP4', '2024-10-13 16:33:11', '2024-10-13 16:39:58', 'N'),
	(4, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM3NTk4LCJleHAiOjE3MjkwMTAzOTh9.2NHewHomUifhDBQuQ3F3dKyMAHnxP3PT91pojZOgriQ', '2024-10-13 16:39:58', '2024-10-13 16:44:20', 'N'),
	(5, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM3ODYwLCJleHAiOjE3MjkwMTA2NjB9.lEEFvOdK44Ce0zZxqbqsCup4_fGa6DptcR8J43Dx4sw', '2024-10-13 16:44:20', '2024-10-13 16:45:48', 'N'),
	(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM3OTg1LCJleHAiOjE3MjkwMTA3ODV9.SnvFjDs43JsMZ8wqsds8PvcDefqsjenw12LOSeAYdMo', '2024-10-13 16:46:25', '2024-10-13 17:09:13', 'N'),
	(7, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM5MzUzLCJleHAiOjE3MjkwMTIxNTN9.RPZKFtzIoTQ5myWBB-sK_KLCdoqoVlr6KKau8Tmfwa0', '2024-10-13 17:09:13', '2024-10-13 17:18:39', 'N'),
	(8, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODM5OTE5LCJleHAiOjE3MjkwMTI3MTl9.fiIVQMYsZA0WxBGFAxSmz4iiVK7WHMfdOVaTbnxngWY', '2024-10-13 17:18:39', '2024-10-13 17:27:38', 'N'),
	(9, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQwNDU4LCJleHAiOjE3MjkwMTMyNTh9.ufhduy-xgqWuefkrx1ZMHjh66hJ0dGrpQ1DF0m_-Sao', '2024-10-13 17:27:38', '2024-10-13 17:46:35', 'N'),
	(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQxNTk1LCJleHAiOjE3MjkwMTQzOTV9.W50A-xTmSH8oE79iHDcLD9LMfnwhueJ-xpFcSFA9kfQ', '2024-10-13 17:46:35', '2024-10-13 17:50:01', 'N'),
	(11, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQxODAxLCJleHAiOjE3MjkwMTQ2MDF9.jlkKxUVVMl_eOp4zDmkkPF-k_34J_S_y55bkHh61WME', '2024-10-13 17:50:01', '2024-10-13 17:58:25', 'N'),
	(12, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQyMzA1LCJleHAiOjE3MjkwMTUxMDV9.pN4kbQKtQeiVo8BRhuPiL6otxvqaZTRqO0yx23xH90Q', '2024-10-13 17:58:25', '2024-10-13 18:00:30', 'N'),
	(13, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQyNDMwLCJleHAiOjE3MjkwMTUyMzB9.9wF2V3eorVyhMtP3PpkwwdOhi94J18nkGb2wIdOzhD4', '2024-10-13 18:00:30', '2024-10-13 18:01:55', 'N'),
	(14, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IlBldGVyIEFuZGVyc29uIiwiaWF0IjoxNzI4ODQyNTE1LCJleHAiOjE3MjkwMTUzMTV9.zJ8fMrIgX-ll6kaU2VvDu_ZQFUerFqY5zPGxW_hEk1A', '2024-10-13 18:01:55', NULL, 'Y');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
