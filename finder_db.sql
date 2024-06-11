-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 11, 2024 at 12:15 PM
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
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `id` int NOT NULL AUTO_INCREMENT,
  `position` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
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
  `first_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `position` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `birth_date`, `email`, `position`, `password`) VALUES
(0, 'Maria Jose', 'Santos', '2022-03-11', 'banana@gmail.com', 'Backend Developer', '12334'),
(1, 'Jose', 'Reyes', '2003-11-08', 'Straw@gmail.com', 'Backend Developer', '0000'),
(2, 'Angelica', 'Cruze', '0200-10-08', 'blue@gmail.com', 'Accountant', 'blue12'),
(3, 'Andres', 'Rivera', '1999-07-15', 'hotdog@gmail.com', 'Team Manager', '1234'),
(4, 'Sofia', 'Cruz', '2000-04-28', 'YOLO@gmail.com', 'Human Resources', '1234'),
(5, 'Jimboy', 'Reyes', '1997-11-21', 'jimboy@gmail.com', 'IT Project Manager', 'qwe'),
(6, 'Dela', 'Cruz', '1997-11-21', 'Cruz@gmail.com', 'Database Administrator', '1234'),
(7, 'Miguel', 'Fernandez', '1990-10-30', 'miguel@gmail.com', 'Software Developer', '12334'),
(9, 'nicolas', 'fabillar', '2003-02-04', 'nicosfabilla@gmail.com', 'Software Developer', '12334'),
(10, 'Hotdog', 'Hatt', '2023-12-22', 'Hotdog1@gmail.com', 'Software Developer', '12334'),
(11, 'Shimia', 'Shimmy', '2023-12-05', 'Shimmy@gmail.com', 'Backend Developer', '1282');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
