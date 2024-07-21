-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 21, 2024 at 04:00 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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

CREATE TABLE `fish_listings` (
  `id` int(11) NOT NULL,
  `sellerID` int(11) NOT NULL,
  `fish_name` varchar(150) NOT NULL,
  `description` varchar(150) NOT NULL,
  `taking_care_guide` varchar(400) NOT NULL,
  `category` varchar(150) NOT NULL,
  `price` int(11) NOT NULL,
  `fish_img` varchar(250) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fish_listings`
--

INSERT INTO `fish_listings` (`id`, `sellerID`, `fish_name`, `description`, `taking_care_guide`, `category`, `price`, `fish_img`) VALUES
(6, 3, 'Betta Fish', 'Vibrant and colorful with striking finnage and aggressive behavior. Thrives in individual tanks.', 'Betta fish thrive in warm water temperatures between 76-82°F (24-28°C) and should be housed in at least a 5-gallon tank. They prefer minimal water movement and need a well-balanced diet of pellets and occasional treats like brine shrimp.', 'freshwater', 100, 'Betta Fish.jpg'),
(7, 3, 'Goldfish Feeders', 'Small and hardy, often used as feeder fish but also make great pets. Easy to care for.', 'Goldfish require a spacious tank with good filtration, as they produce a lot of waste. They thrive in temperatures between 65-75°F (18-24°C) and need a varied diet of flakes, pellets, and vegetables.', 'freshwater', 20, 'Goldfish Feeders.jpg'),
(8, 3, 'Fancy Guppies', 'Known for their bright colors and elaborate tails. Suitable for community tanks.', 'Fancy guppies need a tank of at least 10 gallons, with stable water temperatures between 72-82°F (22-28°C). They enjoy a diet of high-quality flake food, live or frozen brine shrimp, and daphnia.', 'freshwater', 50, 'Fancy Guppies.jpg'),
(9, 3, 'Half Black Blue Guppies', 'Striking half-black, half-blue coloration, active swimmers.', 'These guppies require a stable environment with a heater to maintain temperatures around 75-82°F (24-28°C). Provide them with a variety of foods, including flakes, frozen, and live foods.', 'freshwater', 60, 'Half Black Blue Guppies.jpg'),
(10, 3, 'Local Mollies', 'Hardy and adaptable, suitable for both freshwater and brackish water.', 'Mollies need a tank with at least 20 gallons of water and a temperature range of 72-78°F (22-26°C). They enjoy a varied diet, including flake food, algae wafers, and occasional vegetable treats.', 'freshwater', 30, 'Local Mollies.jpg'),
(11, 3, 'Black King Balloon Mollies', 'Distinctive balloon-like body with glossy black color. Great for community tanks.', 'These mollies require a spacious tank with good water quality, preferably with temperatures between 72-82°F (22-28°C). Feed them a diet of high-quality flakes, algae-based foods, and occasional vegetable matter.', 'freshwater', 70, 'Black King Balloon Mollies.jpg'),
(12, 3, 'Tiger Barbs', 'Energetic with bold stripes. Best kept in groups.', 'Tiger barbs need a tank of at least 20 gallons with temperatures between 74-79°F (23-26°C) and should be kept in schools to prevent aggression. They thrive on a diet of flakes, pellets, and occasional live or frozen foods.', 'freshwater', 40, 'Tiger Barbs.jpg'),
(13, 3, 'Glow Tetra', 'Known for their glowing neon colors. Thrive in schools.', 'Glow tetras require a tank of at least 10 gallons with temperatures between 72-80°F (22-27°C). They thrive on a varied diet of high-quality flake food, micro pellets, and live or frozen brine shrimp.', 'freshwater', 25, 'Glow Tetra.jpg'),
(14, 3, 'Red Cherry Shrimp', 'Excellent for cleaning algae. Easy to care for and breed.', 'Red cherry shrimp thrive in tanks with lots of plants and stable water conditions, with temperatures between 72-78°F (22-26°C). They should be fed a diet of algae wafers, blanched vegetables, and specialized shrimp pellets.', 'freshwater', 15, 'Red Cherry Shrimp.jpg'),
(15, 3, 'Koi (White Color)', 'Elegant and majestic, prized for their pure appearance. Ideal for outdoor ponds.', 'Koi require a large outdoor pond with a robust filtration system and temperatures between 59-77°F (15-25°C). They need a diet of high-quality koi pellets and occasional treats like fruits and vegetables.', 'freshwater', 300, 'Koi (White Color).jpg'),
(16, 3, 'Red Claw Australian Crayfish', 'Known for their bright red claws. Great for larger aquariums.', 'These crayfish need a tank with at least 20 gallons of water and temperatures between 68-75°F (20-24°C). They are omnivorous and enjoy a diet of sinking pellets, vegetables, and occasional protein treats like shrimp.', 'freshwater', 200, 'Red Claw Australian Crayfish.jpg'),
(17, 3, 'Red Clarkii Crayfish', 'Bold red color and resilient. Requires plenty of hiding spots.', 'Red Clarkii crayfish require a tank with plenty of hiding places and temperatures between 65-75°F (18-24°C). They are omnivorous and should be fed sinking pellets, blanched vegetables, and occasional protein treats.', 'freshwater', 180, 'Red Clarkii Crayfish.jpg'),
(18, 3, 'Black Ghost Knife Fish', 'Mysterious and graceful with a unique swimming style. Nocturnal.', 'Black ghost knife fish need a large tank (at least 55 gallons) with temperatures between 73-82°F (23-28°C) and plenty of hiding spots. They are carnivorous and should be fed a diet of live or frozen foods like bloodworms and brine shrimp.', 'freshwater', 250, 'Black Ghost Knife Fish.jpg'),
(19, 3, 'Senegal Bichir', 'Primitive and fascinating with an eel-like appearance. Requires a secure lid.', 'Senegal bichirs require a spacious tank with a tight-fitting lid and temperatures between 75-82°F (24-28°C). They are carnivorous and should be fed a diet of live or frozen foods such as shrimp, fish, and worms.', 'freshwater', 350, 'Senegal Bichir.jpg'),
(20, 3, 'Pingpong Goldfish', 'Known for their round, pingpong ball-like bodies. Friendly and easy to care for.', 'Pingpong goldfish need a spacious tank with good filtration and temperatures between 65-75°F (18-24°C). They enjoy a varied diet of high-quality goldfish pellets, flakes, and occasional vegetable treats.', 'freshwater', 120, 'Pingpong Goldfish.jpg'),
(21, 3, 'Angel Fish', 'Graceful with a distinctive triangular shape and long fins. Can be territorial.', 'Angelfish require a tall tank of at least 20 gallons with temperatures between 75-82°F (24-28°C). They thrive on a diet of flakes, pellets, and occasional live or frozen foods like brine shrimp and bloodworms.\r\n', 'freshwater', 150, 'Angel Fish.jpg'),
(22, 3, 'Apple Snails', 'Large and colorful, excellent algae eaters. Easy to care for.', 'Apple snails need a tank with plenty of vegetation and temperatures between 70-80°F (21-27°C). They enjoy a diet of algae wafers, blanched vegetables, and calcium-rich foods to maintain their shells.', 'freshwater', 35, 'Apple Snails.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

CREATE TABLE `salary` (
  `id` int(11) NOT NULL,
  `position` varchar(150) NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `store_name` varchar(150) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `contact_number` int(11) NOT NULL,
  `password` varchar(150) NOT NULL,
  `profile_img` varchar(250) NOT NULL,
  `is_Seller` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `store_name`, `city`, `email`, `contact_number`, `password`, `profile_img`, `is_Seller`) VALUES
(3, 'Nicolas', 'Fabillar', 'Lunatics Fishtea', 'Blk 115 Lot 3, Northville 14, Calulut, City of San Fernando, Pampanga', 'lunatics.fishtea@gmail.com', 2147483647, '$2a$10$J/DX9dPe4FT29pffg3E12ubWi9GuzjgIkJUb0x4qhk8ZLsw/UBb5W', 'lunatics_fishtea.png', 1),
(4, 'Juan', 'Dela Cruz', 'Aqua Haven', 'Manila', 'aqua.haven@gmail.com', 63, '$2a$10$gsaft9rkMZ.e8Y.qKalRj.3pWsam1fZ3y9FjPAlkiupfsLZ7XxCtu', 'Aqua Haven.png', 1),
(5, 'Maria', 'Santos', 'Ocean Oasis', 'Quezon City', 'ocean.oasis@gmail.com', 63, '$2a$10$oCAlK51cPFvKD1cEn7w/tO92pLVAwAWscoCkV7kHEfdAQELJky8fy', 'Ocean Oasis.png', 1),
(6, 'Jose', 'Reyes', 'Fish Paradise', 'Cebu City', 'fish.paradise@gmail.com', 63, '$2a$10$N9XoO21o9gRwkl3U0ERyQeC2nN2nq5sPbH3yAZqdPKK2phOpnRJ7C', 'Fish Paradise.png', 1),
(7, 'Ana', 'Garcia', 'Water World', 'Davao City', 'water.world@gmail.com', 63, '$2a$10$Nz5v/bSaAdznGxCZD9./sOI2O8Td1V/CktxhEa93wSVfRmVN2IZdC', 'Water World.png', 1),
(8, 'Luis', 'Mendoza', 'Aquatic Wonders', 'Bacolod', 'aquatic.wonders@gmail.com', 63, '$2a$10$i68JGKsUVOJJY7CVbs6KguQxRngCO/4Yt0F7q2q/zXj4xoYG6m4IK', 'Aquatic Wonders.png', 1),
(9, 'Clara', 'Rivera', 'Fish Fantasy', 'Baguio', 'fish.fantasy@gmail.com', 63, '$2a$10$Nm7JtD9ZQc6hLrgdMw1KjeICe0vNWcSxuDMdDMztXihHKVPBGm..i', 'Fish Fantasy.png', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fish_listings`
--
ALTER TABLE `fish_listings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salary`
--
ALTER TABLE `salary`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `profile_img` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fish_listings`
--
ALTER TABLE `fish_listings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `salary`
--
ALTER TABLE `salary`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
