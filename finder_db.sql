-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 26, 2024 at 05:45 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finder_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `fish_listings`
--

DROP TABLE IF EXISTS `fish_listings`;
CREATE TABLE IF NOT EXISTS `fish_listings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sellerID` int NOT NULL,
  `fish_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `price` int NOT NULL,
  `fish_img` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fish_listings`
--

INSERT INTO `fish_listings` (`id`, `sellerID`, `fish_name`, `description`, `category`, `price`, `fish_img`) VALUES
(1, 12, 'Nemo', 'sadadas', 'freshwater', 32232, 'White Black Neon Green Modern SWOT Analysis Infographics (1).png'),
(2, 12, 'Nemooo', 'dasdasdas', 'freshwater', 32232, '2024-Yamaha-XS125-EU-Heritage_White-Static-004-03.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `salary` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `position`, `salary`) VALUES
(1, 'Software Developer', 35750),
(2, 'Backend Developer', 30000),
(3, 'Accountant', 28222),
(4, 'Team Manager', 55000),
(5, 'Human Resources', 28000),
(6, 'Database Administrator', 50279),
(7, 'IT Project Manager', 65000);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `contact_number` int NOT NULL,
  `password` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_Seller` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `city`, `email`, `contact_number`, `password`, `is_Seller`) VALUES
(0, 'Maria Jose', 'Santos', '', 'banana@gmail.com', 0, '12334', 0),
(1, 'Jose', 'Reyes', '', 'Straw@gmail.com', 0, '0000', 0),
(2, 'Angelica', 'Cruze', '', 'blue@gmail.com', 0, 'blue12', 0),
(3, 'Andres', 'Rivera', '', 'hotdog@gmail.com', 0, '1234', 0),
(4, 'Sofia', 'Cruz', '', 'YOLO@gmail.com', 0, '1234', 0),
(5, 'Jimboy', 'Reyes', '', 'jimboy@gmail.com', 0, 'qwe', 0),
(6, 'Dela', 'Cruz', '', 'Cruz@gmail.com', 0, '1234', 0),
(7, 'Miguel', 'Fernandez', '', 'miguel@gmail.com', 0, '12334', 0),
(9, 'nicolas', 'fabillar', '', 'nicosfabilla@gmail.com', 0, '12334', 0),
(10, 'Hotdog', 'Hatt', '', 'Hotdog1@gmail.com', 0, '12334', 0),
(11, 'Shimia', 'Shimmy', '', 'Shimmy@gmail.com', 0, '1282', 0),
(12, 'nico', 'nico', 'San Fernando', 'banana1@gmail.com', 2147483647, '@1banana', 1),
(13, 'nico', 'nico', 'San Fernando', 'banana2@gmail.com', 2147483647, '@1banana', 1),
(14, 'nico', 'nico', 'San Fernando', 'banana3@gmail.com', 2147483647, '@1banana', 0),
(15, 'nico', 'nico', 'San Fernando', 'banana4@gmail.com', 2147483647, '@1banana', 1),
(16, 'nico', 'nico', 'San Fernando', 'banana8@gmail.com', 2147483647, '@1banana', 1),
(17, 'nico', 'nico', 'San Fernando', 'banana9@gmail.com', 2147483647, 'asdasdasdasd', 1),
(18, 'nico', 'nico', 'San Fernando', 'banana10@gmail.com', 2147483647, 'sadasdasd', 1),
(19, 'nico', 'nico', 'San Fernando', 'banana30@gmail.com', 2147483647, '@1banana', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
