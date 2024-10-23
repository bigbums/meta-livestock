-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 21, 2024 at 05:42 PM
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
-- Database: `livestock`
--

-- --------------------------------------------------------

--
-- Table structure for table `audits`
--

CREATE TABLE `audits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `action` varchar(255) NOT NULL,
  `auditable_type` varchar(255) DEFAULT NULL,
  `auditable_id` bigint(20) UNSIGNED DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breeding_management`
--

CREATE TABLE `breeding_management` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `breeding_type` varchar(255) NOT NULL,
  `breeding_date` date NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `actual_delivery_date` date DEFAULT NULL,
  `offspring_count` int(11) DEFAULT NULL,
  `status` enum('pending','confirmed','failed') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breeding_performance_metrics`
--

CREATE TABLE `breeding_performance_metrics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `breeding_record_id` bigint(20) UNSIGNED NOT NULL,
  `conception_rate` double DEFAULT NULL,
  `litter_size` int(11) DEFAULT NULL,
  `weaning_rate` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breeding_records`
--

CREATE TABLE `breeding_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) UNSIGNED NOT NULL,
  `breeding_schedule_id` bigint(20) UNSIGNED NOT NULL,
  `breeding_date` date NOT NULL,
  `expected_delivery_date` date DEFAULT NULL,
  `actual_delivery_date` date DEFAULT NULL,
  `breeding_method` varchar(255) NOT NULL,
  `offspring_count` int(11) DEFAULT NULL,
  `is_successful` tinyint(1) DEFAULT NULL,
  `status` enum('pending','confirmed','completed') NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breeding_schedules`
--

CREATE TABLE `breeding_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) UNSIGNED NOT NULL,
  `scheduled_date` date NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `breeds`
--

CREATE TABLE `breeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `species_id` bigint(20) NOT NULL,
  `name` longtext NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `breeds`
--

INSERT INTO `breeds` (`id`, `species_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Holstein', 'Black and white dairy cattle.', NULL, NULL),
(2, 1, 'Jersey', 'A small breed of dairy cattle.', NULL, NULL),
(3, 1, 'Angus', 'Beef cattle known for their quality meat.', NULL, NULL),
(4, 2, 'Boer', 'A breed of goat known for meat production.', NULL, NULL),
(5, 2, 'Nubian', 'Known for its milk and friendly temperament.', NULL, NULL),
(6, 3, 'Merino', 'Famous for its fine wool.', NULL, NULL),
(7, 3, 'Suffolk', 'Known for its meat quality.', NULL, NULL),
(8, 4, 'Yorkshire', 'A breed of pig known for its high meat quality.', NULL, NULL),
(9, 5, 'Leghorn', 'Known for high egg production.', NULL, NULL),
(10, 6, 'Peking', 'A breed of duck raised for meat.', NULL, NULL),
(11, 7, 'Dromedary', 'One-humped camel known for its endurance.', NULL, NULL),
(12, 8, 'Cape Buffalo', 'A large breed known for its strength.', NULL, NULL),
(13, 9, 'Thoroughbred', 'A breed of horse known for its speed.', NULL, NULL),
(14, 10, 'Suri', 'A breed of alpaca known for its long fleece.', NULL, NULL),
(15, 11, 'Mini Rex', 'A small breed of rabbit with a soft coat.', NULL, NULL),
(16, 12, 'Bronze', 'A breed of turkey known for its size.', NULL, NULL),
(17, 13, 'Huacaya', 'A type of alpaca with a crimped fleece.', NULL, NULL),
(18, 14, 'American Mammoth Jackstock', 'A large donkey breed used as a draft animal.', NULL, NULL),
(19, 15, 'Grant\'s Zebra', 'A species of zebra known for its distinctive stripes.', NULL, NULL),
(20, 16, 'Bison', 'Large grazing mammals known for their size and strength.', NULL, NULL),
(21, 17, 'Common Ostrich', 'The largest living bird.', NULL, NULL),
(22, 18, 'Greater Kudu', 'Known for its impressive horns.', NULL, NULL),
(23, 19, 'Blue Wildebeest', 'A large antelope species.', NULL, NULL),
(24, 20, 'Springbok', 'A medium-sized antelope known for its leaping ability.', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `state_id` bigint(20) NOT NULL,
  `latitude` decimal(10,7) DEFAULT NULL,
  `longitude` decimal(10,7) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `unlocode` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `iso_code` varchar(3) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `disease_incidents`
--

CREATE TABLE `disease_incidents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `health_record_id` bigint(20) NOT NULL,
  `disease_name` varchar(255) NOT NULL,
  `disease_type` varchar(255) DEFAULT NULL,
  `incident_date` date NOT NULL,
  `severity` enum('mild','moderate','severe') NOT NULL,
  `symptoms` text DEFAULT NULL,
  `prevention_measures` text DEFAULT NULL,
  `control_measures` text DEFAULT NULL,
  `treatment_given` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farms`
--

CREATE TABLE `farms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `farm_name` varchar(255) NOT NULL,
  `owner_id` bigint(20) NOT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `size` double DEFAULT NULL,
  `farm_type` enum('Dairy','Poultry','Mixed','Crop') NOT NULL,
  `location_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feeding_management`
--

CREATE TABLE `feeding_management` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `feeding_date` date NOT NULL,
  `feed_type` varchar(255) NOT NULL,
  `quantity` decimal(8,2) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feeds`
--

CREATE TABLE `feeds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feed_name` varchar(255) NOT NULL,
  `feed_description` varchar(255) NOT NULL,
  `feed_type_id` bigint(20) UNSIGNED NOT NULL,
  `units_of_measure` varchar(255) NOT NULL,
  `nutritional_value` text DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feed_distributions`
--

CREATE TABLE `feed_distributions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feed_schedule_id` bigint(20) UNSIGNED NOT NULL,
  `distribution_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `actual_quantity_distributed` decimal(10,2) NOT NULL,
  `distributed_by` varchar(255) DEFAULT NULL,
  `feed_by_user` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feed_schedules`
--

CREATE TABLE `feed_schedules` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_group_id` bigint(20) UNSIGNED NOT NULL,
  `feed_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `approved_quantity` decimal(10,2) DEFAULT NULL,
  `approver` varchar(255) DEFAULT NULL,
  `feed_location` varchar(255) DEFAULT NULL,
  `frequency` varchar(255) NOT NULL,
  `occurrence` varchar(255) DEFAULT NULL,
  `time_of_day` time NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feed_types`
--

CREATE TABLE `feed_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `feed_type_name` varchar(255) NOT NULL,
  `feed_variant_name` varchar(255) DEFAULT NULL,
  `feed_type_desc` varchar(255) DEFAULT NULL,
  `feed_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feed_types`
--

INSERT INTO `feed_types` (`id`, `feed_type_name`, `feed_variant_name`, `feed_type_desc`, `feed_notes`, `created_at`, `updated_at`) VALUES
(4, 'Silage', NULL, 'okayy', NULL, '2024-10-10 12:53:56', '2024-10-16 10:35:54'),
(5, 'Silage', NULL, 'storage', NULL, '2024-10-10 12:54:40', '2024-10-10 12:54:40'),
(7, 'Silage', NULL, 'sadsa', NULL, '2024-10-16 09:12:15', '2024-10-16 09:12:15');

-- --------------------------------------------------------

--
-- Table structure for table `group_criteria`
--

CREATE TABLE `group_criteria` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_group_id` bigint(20) UNSIGNED DEFAULT NULL,
  `key` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_criteria`
--

INSERT INTO `group_criteria` (`id`, `livestock_group_id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(6, NULL, 'Dese', 'male', '2024-10-15 15:38:10', '2024-10-15 15:38:10'),
(8, NULL, 'Gender', 'male', '2024-10-16 09:10:14', '2024-10-16 09:10:14'),
(9, NULL, 'Gender', 'male', '2024-10-16 09:11:01', '2024-10-16 09:11:01'),
(10, NULL, 'Gender', 'male', '2024-10-16 09:15:26', '2024-10-16 09:15:26'),
(11, NULL, 'Gender', 'male', '2024-10-16 09:17:34', '2024-10-16 09:17:34'),
(12, NULL, 'Gender', 'female', '2024-10-16 09:23:33', '2024-10-16 09:23:33'),
(13, NULL, 'Genderddd', 'male', '2024-10-16 15:44:20', '2024-10-16 15:44:20'),
(14, NULL, 'Gender', 'femaleeruuuuuuuuuuuut', '2024-10-16 15:45:53', '2024-10-16 15:45:53'),
(15, NULL, 'Gender', 'female', '2024-10-16 15:46:42', '2024-10-16 15:46:42'),
(16, NULL, 'Age', '1-2', '2024-10-17 14:22:13', '2024-10-17 14:22:13'),
(17, NULL, 'weight', '5kg', '2024-10-17 14:23:41', '2024-10-17 14:23:41'),
(19, NULL, 'Species', 'cattle', '2024-10-18 08:48:45', '2024-10-18 08:48:45');

-- --------------------------------------------------------

--
-- Table structure for table `group_criteria_livestock_group`
--

CREATE TABLE `group_criteria_livestock_group` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_group_id` bigint(20) UNSIGNED NOT NULL,
  `group_criteria_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `group_criteria_livestock_group`
--

INSERT INTO `group_criteria_livestock_group` (`id`, `livestock_group_id`, `group_criteria_id`, `created_at`, `updated_at`) VALUES
(1, 13, 10, NULL, NULL),
(2, 13, 16, NULL, NULL),
(3, 13, 17, NULL, NULL),
(4, 14, 8, NULL, NULL),
(5, 14, 16, NULL, NULL),
(6, 14, 17, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `handling_event_management`
--

CREATE TABLE `handling_event_management` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `event_type` varchar(100) NOT NULL,
  `event_date` date NOT NULL,
  `description` text DEFAULT NULL,
  `handler_name` varchar(100) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `housing_mvmt_mgmt`
--

CREATE TABLE `housing_mvmt_mgmt` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `location` varchar(255) NOT NULL,
  `movement_type` varchar(255) NOT NULL,
  `movement_date` date NOT NULL,
  `reason` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `inventories`
--

CREATE TABLE `inventories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_id` bigint(20) NOT NULL,
  `total_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `languages`
--

CREATE TABLE `languages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(10) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `languages`
--

INSERT INTO `languages` (`id`, `name`, `code`, `is_default`, `status`, `created_at`, `updated_at`) VALUES
(1, 'English', 'en', 1, 1, NULL, NULL),
(2, 'French', 'fr', 0, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `livestocks`
--

CREATE TABLE `livestocks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL,
  `species_id` bigint(20) UNSIGNED NOT NULL,
  `breed_id` varchar(20) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `health_status` enum('healthy','sick','recovering') DEFAULT NULL,
  `tag_id` varchar(255) NOT NULL,
  `herd_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) NOT NULL,
  `location_id` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `livestocks`
--

INSERT INTO `livestocks` (`id`, `type`, `species_id`, `breed_id`, `date_of_birth`, `gender`, `health_status`, `tag_id`, `herd_id`, `name`, `owner_id`, `location_id`, `created_at`, `updated_at`) VALUES
(2, 'Sheep', 3, '6', '1974-02-26', 'Male', 'sick', 'TAG-05OP', 'HERD-54OC', 'Delphia', 2, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(3, 'Goat', 2, '5', '1991-01-18', 'Female', 'sick', 'TAG-98BV', 'HERD-39DK', 'Arlie', 5, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(4, 'Cattle', 1, '3', '2015-12-06', 'Male', 'sick', 'TAG-88TT', 'HERD-34HY', 'Myriam', 5, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(5, 'Cattle', 1, '2', '1985-02-05', 'Female', 'sick', 'TAG-85IT', 'HERD-86CT', 'Danial', 3, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(6, 'Goat', 2, '4', '2017-09-23', 'Female', 'healthy', 'TAG-83DR', 'HERD-90OK', 'Russ', 5, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(7, 'Sheep', 3, '7', '1995-06-24', 'Female', 'sick', 'TAG-40JG', 'HERD-86LM', 'Helene', 4, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(8, 'Chicken', 5, '9', '2004-04-02', 'Female', 'healthy', 'TAG-21WD', 'HERD-00RZ', 'Jo', 1, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(9, 'Goat', 2, '4', '1985-08-04', 'Female', 'healthy', 'TAG-01WP', 'HERD-73JG', 'Chesley', 3, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(10, 'Goat', 2, '5', '2007-01-15', 'Male', 'healthy', 'TAG-81OV', 'HERD-50IF', 'Aditya', 3, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(11, 'Chicken', 5, '9', '1985-11-25', 'Male', 'healthy', 'TAG-02HJ', 'HERD-89XV', 'Marie', 1, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(12, 'Chicken', 5, '9', '2023-01-02', 'Male', 'sick', 'TAG-57NF', 'HERD-88EF', 'Napoleon', 3, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(13, 'Goat', 2, '4', '1982-12-15', 'Female', 'healthy', 'TAG-20KH', 'HERD-24FD', 'Lukas', 1, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(14, 'Cattle', 1, '2', '1976-07-15', 'Female', 'sick', 'TAG-52LP', 'HERD-38GR', 'Alexandre', 2, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(15, 'Pig', 4, '8', '2009-09-18', 'Male', 'healthy', 'TAG-13ZJ', 'HERD-11JJ', 'Taurean', 2, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(16, 'Chicken', 5, '9', '1994-03-14', 'Male', 'healthy', 'TAG-09ZH', 'HERD-83ZH', 'Leanne', 3, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(17, 'Chicken', 5, '9', '2016-02-22', 'Female', 'healthy', 'TAG-79YF', 'HERD-24QU', 'Kayleigh', 1, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(18, 'Sheep', 3, '7', '1993-10-24', 'Female', 'sick', 'TAG-35YI', 'HERD-69UQ', 'Elvie', 5, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(19, 'Chicken', 5, '9', '2016-08-25', 'Male', 'sick', 'TAG-90EW', 'HERD-47QZ', 'Adell', 2, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(20, 'Cattle', 1, '1', '2006-10-17', 'Female', 'healthy', 'TAG-69XP', 'HERD-94OS', 'Janessa', 2, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(21, 'Sheep', 3, '6', '2020-10-29', 'Male', 'sick', 'TAG-07NF', 'HERD-27HO', 'Novella', 1, NULL, '2024-09-24 12:18:25', '2024-09-24 12:18:25'),
(24, 'Rabbit', 11, '15', '2024-09-30', 'Female', 'healthy', 'TAG-R001', 'Herd-R001', NULL, 4, NULL, '2024-10-07 14:17:28', '2024-10-07 14:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `livestock_groups`
--

CREATE TABLE `livestock_groups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `livestock_groups`
--

INSERT INTO `livestock_groups` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(4, 'Female', 'wazaaa', '2024-10-17 09:41:30', '2024-10-17 09:41:30'),
(5, 'Female', 'pep', '2024-10-17 09:44:30', '2024-10-17 09:44:30'),
(8, 'Young Female', 'Young Femal Cattle', '2024-10-17 14:28:45', '2024-10-17 14:28:45'),
(9, 'Young Male', 'Young Male Cattle', '2024-10-17 14:42:01', '2024-10-17 14:42:01'),
(10, 'Young Male-Sheep', 'Young Male Sheep', '2024-10-17 15:42:45', '2024-10-17 15:42:45'),
(11, 'Young Male-Rabbit', 'Young Male Sheep', '2024-10-17 15:54:58', '2024-10-17 15:54:58'),
(13, 'Young Male-Goat', 'Young Male Goat', '2024-10-17 16:17:37', '2024-10-17 16:17:37'),
(14, 'Young Male-Broiller', 'Young Male-Broiller', '2024-10-18 08:42:22', '2024-10-18 08:42:22');

-- --------------------------------------------------------

--
-- Table structure for table `localizatn_tracking`
--

CREATE TABLE `localizatn_tracking` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `rfid_tag` bigint(20) NOT NULL,
  `herd_id` bigint(20) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `speed` double DEFAULT NULL,
  `direction` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) DEFAULT NULL,
  `state_id` bigint(20) DEFAULT NULL,
  `city_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(5, '2024_09_03_165556_create_inventories_table', 1),
(6, '2024_09_03_172623_create_health_records_table', 1),
(7, '2024_09_04_160935_create_breeding_management_table', 1),
(8, '2024_09_04_165416_create_feeding_management_table', 1),
(9, '2024_09_04_170755_create_housing_mvmt_mgmt_table', 1),
(10, '2024_09_05_150854_create_localizatn_tracking_table', 1),
(11, '2024_09_05_154304_create_handling_event_management_table', 1),
(12, '2024_09_05_164123_create_countries_table', 1),
(13, '2024_09_05_164123_create_states_table', 1),
(14, '2024_09_05_164124_create_cities_table', 1),
(15, '2024_09_05_164125_create_locations_table', 1),
(16, '2024_09_06_103028_create_farms_table', 1),
(17, '2024_09_06_124149_create_roles_table', 1),
(18, '2024_09_06_124150_create_privileges_table', 1),
(19, '2024_09_06_124150_create_role_privilege_table', 1),
(20, '2024_09_06_124151_create_user_role_table', 1),
(21, '2024_09_06_143536_create_personal_access_tokens_table', 1),
(22, '2024_09_06_160046_create_languages_table', 1),
(23, '2024_09_08_011301_create_translations_table', 1),
(24, '2024_09_08_011636_create_user_language_preferences_table', 1),
(25, '2024_09_10_132242_create_audits_table', 1),
(26, '2024_09_11_151601_create_disease_incidents_table', 1),
(27, '2024_09_12_095258_create_breeding_records_table', 1),
(28, '2024_09_12_100514_create_breeding_schedules_table', 1),
(29, '2024_09_12_105713_create_pedigrees_table', 1),
(30, '2024_09_12_110643_create_reproduction_monitoring_table', 1),
(31, '2024_09_12_110816_create_breeding_performance_metrics_table', 1),
(32, '2024_09_17_092119_create_posts_table', 1),
(33, '2024_09_03_163125_create_livestocks_table', 2),
(34, '2024_09_24_125235_create_breeds_table', 3),
(35, '2024_09_25_094535_create_usages_table', 4),
(36, '2024_09_25_094027_create_species_usage_table', 5),
(37, '2024_10_02_121957_create_treatment_table', 6),
(38, '2024_10_04_093453_create_nutritional_requirements_table', 7),
(40, '2024_10_08_091833_create_feed_types_table', 8),
(47, '2024_10_08_083724_create_livestock_group_table', 12),
(49, '2024_10_14_144918_create_group_criteria_table', 13),
(50, '2024_10_17_100834_create_group_criteria_livestock_group_table', 14),
(52, '2024_10_08_095518_create_feeds_table', 16),
(53, '2024_10_18_100735_create_feed_distributions_table', 17),
(54, '2024_10_08_083808_create_feed_schedule_table', 18);

-- --------------------------------------------------------

--
-- Table structure for table `nutritional_requirements`
--

CREATE TABLE `nutritional_requirements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `species_id` bigint(20) DEFAULT NULL,
  `breed_id` bigint(20) DEFAULT NULL,
  `age_range` varchar(255) DEFAULT NULL,
  `weight_range` varchar(255) DEFAULT NULL,
  `production_type` varchar(255) DEFAULT NULL,
  `requirement_type` varchar(255) DEFAULT NULL,
  `requirement_value` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nutritional_requirements`
--

INSERT INTO `nutritional_requirements` (`id`, `species_id`, `breed_id`, `age_range`, `weight_range`, `production_type`, `requirement_type`, `requirement_value`, `created_at`, `updated_at`) VALUES
(116, 4, 8, '7', '20', 'dairy', 'carbs', '10', '2024-10-07 13:12:36', '2024-10-10 14:09:02'),
(117, 4, 8, '4', '20', 'dairy', 'protein', '10', '2024-10-07 13:17:02', '2024-10-07 13:17:02');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pedigrees`
--

CREATE TABLE `pedigrees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) UNSIGNED NOT NULL,
  `sire_id` bigint(20) UNSIGNED DEFAULT NULL,
  `dam_id` bigint(20) UNSIGNED DEFAULT NULL,
  `generation` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'Dele', 'a2bf28a3705028824d7ff57e6b47bf9698ac6238c8fe3544b0b3fc6d7b93a679', '[\"*\"]', NULL, NULL, '2024-09-18 14:18:27', '2024-09-18 14:18:27'),
(3, 'App\\Models\\User', 3, 'Samuel', '5e94aef7f904b922b93aa22a446a3f40e6cc3c7ec85bb0a0a4a38a057d1dad8a', '[\"*\"]', NULL, NULL, '2024-09-18 14:44:25', '2024-09-18 14:44:25'),
(74, 'App\\Models\\User', 4, 'Samuel', '6ce32bd98b553bb3849a0ae431fafe8441761808c4b7b1a1bc6b7f14f024ff17', '[\"*\"]', '2024-10-09 12:35:41', NULL, '2024-10-09 12:15:18', '2024-10-09 12:35:41'),
(75, 'App\\Models\\User', 4, 'Samuel', '41461388b29e20f6f65c31217672c2cba1580b785297692f80a7e1e2f16fc8c9', '[\"*\"]', '2024-10-09 13:49:25', NULL, '2024-10-09 13:31:36', '2024-10-09 13:49:25'),
(76, 'App\\Models\\User', 4, 'Samuel', '634658841049504300498cef5d466616da6697492267478dc00ad3770351ddcd', '[\"*\"]', '2024-10-10 08:09:13', NULL, '2024-10-10 08:09:11', '2024-10-10 08:09:13'),
(77, 'App\\Models\\User', 4, 'Samuel', 'c0ecb087cbe5027aeee8923cc7fddaed31cf092ee88c682854851d86cf7283f3', '[\"*\"]', '2024-10-10 09:23:58', NULL, '2024-10-10 09:08:30', '2024-10-10 09:23:58'),
(78, 'App\\Models\\User', 4, 'Samuel', 'f58adaf94213123677998b49cb035341d7fd4f37eb6767c423fe966dc86747a9', '[\"*\"]', '2024-10-10 10:13:31', NULL, '2024-10-10 09:53:42', '2024-10-10 10:13:31'),
(79, 'App\\Models\\User', 4, 'Samuel', '809fef3e32f0cac2cad457dd4fac36151c43c3b7eb646e706609c40aa376f8f5', '[\"*\"]', '2024-10-10 10:39:38', NULL, '2024-10-10 10:13:33', '2024-10-10 10:39:38'),
(80, 'App\\Models\\User', 4, 'Samuel', 'f3af6a3a3cd3cde1344790a4f1084b9ac9b51dfcdeb62d9eb7cf0fc4a76d71d5', '[\"*\"]', '2024-10-10 10:54:18', NULL, '2024-10-10 10:45:16', '2024-10-10 10:54:18'),
(81, 'App\\Models\\User', 4, 'Samuel', '90d227a5ede5dbae99a35706e5a360270fb73902749c38813451f419cc40810c', '[\"*\"]', '2024-10-10 12:28:46', NULL, '2024-10-10 12:16:13', '2024-10-10 12:28:46'),
(82, 'App\\Models\\User', 4, 'Samuel', 'd5038ff673dcba3f83b8404f6897b1021df8daa954c0db5255101501cd932af2', '[\"*\"]', '2024-10-10 12:58:58', NULL, '2024-10-10 12:58:57', '2024-10-10 12:58:58'),
(83, 'App\\Models\\User', 4, 'Samuel', '5737b1e91a5c513a6ceb53e37794e0e7b62bd5ed141761feb566b5b6a3dd75c9', '[\"*\"]', '2024-10-10 13:54:06', NULL, '2024-10-10 13:32:59', '2024-10-10 13:54:06'),
(84, 'App\\Models\\User', 4, 'Samuel', '4d74b8d0a169a7f66a505fa3a6e0e50eefc7e9153102eacded27b103057927a7', '[\"*\"]', '2024-10-10 14:23:55', NULL, '2024-10-10 14:12:41', '2024-10-10 14:23:55'),
(85, 'App\\Models\\User', 4, 'Samuel', '7fa2e90c303e9977b52ff8fcaf5e5cde5e10d0c760201b6b56738c702730304e', '[\"*\"]', '2024-10-11 14:42:07', NULL, '2024-10-11 14:42:03', '2024-10-11 14:42:07'),
(86, 'App\\Models\\User', 4, 'Samuel', '5cf503a965ca00e87daabf883d329fbee6145b979c07e62e510a73c417398448', '[\"*\"]', '2024-10-11 14:42:08', NULL, '2024-10-11 14:42:05', '2024-10-11 14:42:08'),
(87, 'App\\Models\\User', 4, 'Samuel', 'd241703a746aff5d572b94a5bb433337779f660ee51aac3a6cdb399e47641853', '[\"*\"]', '2024-10-11 14:42:08', NULL, '2024-10-11 14:42:06', '2024-10-11 14:42:08'),
(88, 'App\\Models\\User', 4, 'Samuel', '0ee5cd9e2dd26dda1e2c36e54039f0a56c9eabae1096883254f6bf1e0aa19ded', '[\"*\"]', '2024-10-11 14:42:09', NULL, '2024-10-11 14:42:07', '2024-10-11 14:42:09'),
(89, 'App\\Models\\User', 4, 'Samuel', '86d822f13b0b50b0539d02ceb6f77f8ae9f4e9f79b5ad212d63024b373079804', '[\"*\"]', '2024-10-11 15:22:09', NULL, '2024-10-11 15:22:08', '2024-10-11 15:22:09'),
(90, 'App\\Models\\User', 4, 'Samuel', 'f2d4a23ba8cef5e52c578e86b7208ed3b1579dfdc6cf793e43473045ad5df3f7', '[\"*\"]', '2024-10-14 10:59:23', NULL, '2024-10-14 10:57:21', '2024-10-14 10:59:23'),
(91, 'App\\Models\\User', 4, 'Samuel', '103c7655c466f6ea901d19e61bdbda8b9ddd1fbac9c04b1340621bbb92a8b0a4', '[\"*\"]', '2024-10-14 12:06:26', NULL, '2024-10-14 11:37:31', '2024-10-14 12:06:26'),
(92, 'App\\Models\\User', 4, 'Samuel', '14bebf549a47d4722b4088c8c01265fe14b03b187681a7960e3f50ea0c6f83c3', '[\"*\"]', '2024-10-14 12:06:28', NULL, '2024-10-14 12:06:27', '2024-10-14 12:06:28'),
(93, 'App\\Models\\User', 4, 'Samuel', '3bb5a3f5e70a2b1d2da255c4062315f5edcfb973484f9185e0c3003b2a3e7f84', '[\"*\"]', '2024-10-14 12:54:09', NULL, '2024-10-14 12:39:29', '2024-10-14 12:54:09'),
(94, 'App\\Models\\User', 4, 'Samuel', 'f051f3896d4438ac10cc9ee10b96c4f0490f461f72cc6d267dee6f913d7376a6', '[\"*\"]', '2024-10-14 14:37:22', NULL, '2024-10-14 14:37:20', '2024-10-14 14:37:22'),
(95, 'App\\Models\\User', 4, 'Samuel', 'd37ab027dd4f5c594e389e77ff1719acfd0b0c2e69bef1842d3504692e4cf8ff', '[\"*\"]', '2024-10-14 15:06:19', NULL, '2024-10-14 14:37:21', '2024-10-14 15:06:19'),
(96, 'App\\Models\\User', 4, 'Samuel', '97a50f691579f98b9d372e4a2145e1408aa7129205fec8ee0913cf885b7aec3c', '[\"*\"]', '2024-10-15 13:40:01', NULL, '2024-10-15 13:32:11', '2024-10-15 13:40:01'),
(97, 'App\\Models\\User', 4, 'Samuel', '499177817d38d8dbdefac9e5a6289ef81b545d33bbe0d168d16d08079d637989', '[\"*\"]', '2024-10-15 14:31:16', NULL, '2024-10-15 14:04:53', '2024-10-15 14:31:16'),
(98, 'App\\Models\\User', 4, 'Samuel', 'c165d37c29de6eceb253b79ed147637b0e18457c514606f21b3293a125d9aed9', '[\"*\"]', '2024-10-15 14:41:43', NULL, '2024-10-15 14:35:48', '2024-10-15 14:41:43'),
(99, 'App\\Models\\User', 4, 'Samuel', 'f02d90b493b4704e9947bfbeb0932a94c9f0da30120cf05fe39e15a39b6dc835', '[\"*\"]', '2024-10-15 14:42:43', NULL, '2024-10-15 14:41:45', '2024-10-15 14:42:43'),
(100, 'App\\Models\\User', 4, 'Samuel', '28a1ce60177d00b4e9e5f24598bfc61a1d406cf1672852559a1860e86430d463', '[\"*\"]', '2024-10-15 15:07:33', NULL, '2024-10-15 14:42:44', '2024-10-15 15:07:33'),
(101, 'App\\Models\\User', 4, 'Samuel', '85fddb5ab53edabef856869999e1c2fbd59d484afb9b2ef8c3a3e26db1581214', '[\"*\"]', '2024-10-15 15:35:26', NULL, '2024-10-15 15:18:00', '2024-10-15 15:35:26'),
(102, 'App\\Models\\User', 4, 'Samuel', '480f517addc0c7909e05b1714ec9ed2f05670012018aaffe11c6926855a0c6e5', '[\"*\"]', '2024-10-15 16:04:46', NULL, '2024-10-15 16:03:36', '2024-10-15 16:04:46'),
(103, 'App\\Models\\User', 4, 'Samuel', 'dfdb5e57d3facd6ed309977fdff512992a6c087b6063ecd2cfaa399b810006f6', '[\"*\"]', '2024-10-16 08:31:47', NULL, '2024-10-16 08:20:47', '2024-10-16 08:31:47'),
(104, 'App\\Models\\User', 4, 'Samuel', 'bd223262cb10b2a1abfd0e88bd2e2e826aa55b07122c47932cf5c4826989e213', '[\"*\"]', '2024-10-16 08:55:40', NULL, '2024-10-16 08:55:39', '2024-10-16 08:55:40'),
(105, 'App\\Models\\User', 4, 'Samuel', '96d671a0afe8900a4ec36819dc989ae76ee6a07d5731efbef6132be5a84516d6', '[\"*\"]', '2024-10-16 10:00:52', NULL, '2024-10-16 09:34:13', '2024-10-16 10:00:52'),
(106, 'App\\Models\\User', 4, 'Samuel', 'de27e9eb8d1514162d9aad8336e5c60f5ed78f90f77c389ca1eeac34247ad71e', '[\"*\"]', '2024-10-16 10:29:21', NULL, '2024-10-16 10:08:11', '2024-10-16 10:29:21'),
(107, 'App\\Models\\User', 4, 'Samuel', '99c2f84bbb518f2d4975a8b467efdd2db5dde4d171635713be12cb98d4e95c54', '[\"*\"]', '2024-10-16 11:12:10', NULL, '2024-10-16 10:46:46', '2024-10-16 11:12:10'),
(108, 'App\\Models\\User', 4, 'Samuel', '117846376bc1585db18e6b39e81899a3c9b0c91168636d511a7a9fe21b40973b', '[\"*\"]', '2024-10-16 11:25:49', NULL, '2024-10-16 11:25:48', '2024-10-16 11:25:49'),
(109, 'App\\Models\\User', 4, 'Samuel', 'b2cfe7bd743d7fea06ae4e3cd0c8d09d7387f05efa540783bf3e7d36f90b1f50', '[\"*\"]', '2024-10-16 13:33:21', NULL, '2024-10-16 13:16:52', '2024-10-16 13:33:21'),
(110, 'App\\Models\\User', 4, 'Samuel', '15a03256de1a8212bcf94b3d226345ad9c153ae7d92160fdb8a4d9a4802c3f3a', '[\"*\"]', '2024-10-16 14:03:46', NULL, '2024-10-16 13:51:37', '2024-10-16 14:03:46'),
(111, 'App\\Models\\User', 4, 'Samuel', 'f9a5f33d6a4d826a1877c9466520430835947384fc7281cc55a61b391a2eebad', '[\"*\"]', '2024-10-16 14:43:57', NULL, '2024-10-16 14:23:08', '2024-10-16 14:43:57'),
(112, 'App\\Models\\User', 4, 'Samuel', '069be7c7a7e3c684de1ff662adac4b130cb5c15d3f1e0acf59ef6a87bb1ecc5f', '[\"*\"]', '2024-10-16 15:14:01', NULL, '2024-10-16 14:57:51', '2024-10-16 15:14:01'),
(113, 'App\\Models\\User', 4, 'Samuel', '038f2b38525f364d1f7a67f0a543ce84db2859efd340e0ff5bbb87851d9c748d', '[\"*\"]', '2024-10-16 15:45:24', NULL, '2024-10-16 15:32:45', '2024-10-16 15:45:24'),
(114, 'App\\Models\\User', 4, 'Samuel', '324153a1c3a416725442b835dc84877a9b73979d9923e0d52032c1bb818bf5c2', '[\"*\"]', '2024-10-17 08:47:18', NULL, '2024-10-17 08:45:11', '2024-10-17 08:47:18'),
(115, 'App\\Models\\User', 4, 'Samuel', '65a1bef1aa95abae4bd0c717ef258616ab9ae2fe36d0e25e36f37471ced366d4', '[\"*\"]', '2024-10-17 09:40:52', NULL, '2024-10-17 09:34:49', '2024-10-17 09:40:52'),
(116, 'App\\Models\\User', 4, 'Samuel', '7ea7094f8c17bbc5dd9cf81afae359e5760a1ebfd72bca20429e4407cc0c1531', '[\"*\"]', '2024-10-17 10:33:22', NULL, '2024-10-17 10:05:06', '2024-10-17 10:33:22'),
(117, 'App\\Models\\User', 4, 'Samuel', '704b07719ee87c9dcbb40d009283c9953d2e03f4fdfe46adea0835ba36f9b979', '[\"*\"]', '2024-10-17 11:04:21', NULL, '2024-10-17 10:35:28', '2024-10-17 11:04:21'),
(118, 'App\\Models\\User', 4, 'Samuel', 'b2f6cac0b70d98e88de9ed38ed574fc437c5f23ec978e52bac290cc6e3274a22', '[\"*\"]', '2024-10-17 11:04:24', NULL, '2024-10-17 11:04:23', '2024-10-17 11:04:24'),
(119, 'App\\Models\\User', 4, 'Samuel', 'f82d6f28db48cdf99b11837a6cd35bf58c22be61ca4cecc1fc36a55ca7f96e53', '[\"*\"]', '2024-10-17 12:51:05', NULL, '2024-10-17 12:35:14', '2024-10-17 12:51:05'),
(120, 'App\\Models\\User', 4, 'Samuel', '15e18b1d60915632377f25bbbf2bacbd948141f936d1477813e4e7e3642a1152', '[\"*\"]', '2024-10-17 13:18:29', NULL, '2024-10-17 13:18:26', '2024-10-17 13:18:29'),
(121, 'App\\Models\\User', 4, 'Samuel', '9c89d0505c41c53f655c10b0b104c2ebd1eca43c58cf173ae26db51cfcd5987d', '[\"*\"]', '2024-10-17 13:18:31', NULL, '2024-10-17 13:18:27', '2024-10-17 13:18:31'),
(122, 'App\\Models\\User', 4, 'Samuel', '4165765b2198558378d4e8cbc7e87c9089002bcea784ce3d466d84ac7ea7d2bb', '[\"*\"]', '2024-10-17 13:18:31', NULL, '2024-10-17 13:18:28', '2024-10-17 13:18:31'),
(123, 'App\\Models\\User', 4, 'Samuel', 'd0eb0897c3086ff3414badfa856f3cb9ee6b4ccbd89341fa974b5077f03affaf', '[\"*\"]', '2024-10-17 13:31:15', NULL, '2024-10-17 13:18:29', '2024-10-17 13:31:15'),
(124, 'App\\Models\\User', 4, 'Samuel', '895c61c4ce938c196475c9796aacbbf62077bd195a96942bc550df0a171011a5', '[\"*\"]', '2024-10-17 15:11:26', NULL, '2024-10-17 15:11:25', '2024-10-17 15:11:26'),
(125, 'App\\Models\\User', 4, 'Samuel', '025b5af1fef74f4612d424a236d34151f4b8159a3c0a1aa81a8e831bfeed4c2c', '[\"*\"]', '2024-10-18 08:38:29', NULL, '2024-10-18 08:38:26', '2024-10-18 08:38:29'),
(126, 'App\\Models\\User', 4, 'Samuel', '34f3f02fd9009087dbe021c3b6508ab962685c2ebb9f4c55fc0ef026b6f65ce0', '[\"*\"]', '2024-10-18 08:38:30', NULL, '2024-10-18 08:38:29', '2024-10-18 08:38:30'),
(127, 'App\\Models\\User', 4, 'Samuel', 'c5dbb9541d2e84288b4fe348aea2e6733566340dbb7e07bcca3d2ccb9aaaf846', '[\"*\"]', '2024-10-18 11:05:02', NULL, '2024-10-18 10:35:48', '2024-10-18 11:05:02'),
(128, 'App\\Models\\User', 4, 'Samuel', 'fce1426b0d78ad0c0b505d7d08a8c6bf43c2ba951a804c3923660096084110a4', '[\"*\"]', '2024-10-18 11:11:05', NULL, '2024-10-18 11:11:04', '2024-10-18 11:11:05'),
(129, 'App\\Models\\User', 4, 'Samuel', 'ba22231fe8917804eff89aaa82b41e8061fbd5d01e2764aa74483f9dd1019b37', '[\"*\"]', '2024-10-18 12:46:28', NULL, '2024-10-18 12:46:27', '2024-10-18 12:46:28');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `title`, `body`, `created_at`, `updated_at`) VALUES
(1, 5, 'post test', 'post test', '2024-09-19 15:26:39', '2024-09-19 15:26:39'),
(2, 5, 'post 2', 'post 2', '2024-09-19 15:27:07', '2024-09-19 15:27:07'),
(4, 4, 'fdfgdFSFGDFCFC', 'fkffkgykfgikyfgvhvFDHDFGHCFGFVU', '2024-09-20 14:10:56', '2024-09-20 14:47:08'),
(5, 4, 'It is well', 'It is well', '2024-09-20 15:18:41', '2024-09-20 15:18:41');

-- --------------------------------------------------------

--
-- Table structure for table `privileges`
--

CREATE TABLE `privileges` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reproduction_monitoring`
--

CREATE TABLE `reproduction_monitoring` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `dam_id` bigint(20) UNSIGNED NOT NULL,
  `last_breeding_date` date DEFAULT NULL,
  `calving_interval` int(11) DEFAULT NULL,
  `pregnancy_count` int(11) NOT NULL DEFAULT 0,
  `successful_pregnancies` int(11) NOT NULL DEFAULT 0,
  `stillbirths` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'Administrator', '2024-09-24 12:15:22', '2024-09-24 12:15:22'),
(2, 'user', 'Regular User', '2024-09-24 12:15:22', '2024-09-24 12:15:22');

-- --------------------------------------------------------

--
-- Table structure for table `role_privilege`
--

CREATE TABLE `role_privilege` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `privilege_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `species`
--

CREATE TABLE `species` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `sub_specie` varchar(255) DEFAULT NULL,
  `breed_id` bigint(20) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `African` enum('Yes','No') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `species`
--

INSERT INTO `species` (`id`, `name`, `description`, `sub_specie`, `breed_id`, `location`, `African`, `created_at`, `updated_at`) VALUES
(1, 'Cattle', NULL, 'Bos taurus', NULL, 'Grasslands', 'Yes', NULL, NULL),
(2, 'Goat', NULL, 'Capra aegagrus hircus', NULL, 'Hills', 'Yes', NULL, NULL),
(3, 'Sheep', NULL, 'Ovis aries', NULL, 'Grasslands', 'Yes', NULL, NULL),
(4, 'Pig', NULL, 'Sus scrofa domesticus', NULL, 'Farms', 'No', NULL, NULL),
(5, 'Chicken', NULL, 'Gallus gallus domesticus', NULL, 'Farms', 'Yes', NULL, NULL),
(6, 'Duck', NULL, 'Anas platyrhynchos domesticus', NULL, 'Wetlands', 'Yes', NULL, NULL),
(7, 'Camel', NULL, 'Camelus dromedarius', NULL, 'Deserts', 'Yes', NULL, NULL),
(8, 'Buffalo', NULL, 'Syncerus caffer', NULL, 'Savannas', 'Yes', NULL, NULL),
(9, 'Horse', NULL, 'Equus ferus caballus', NULL, 'Grasslands', 'No', NULL, NULL),
(10, 'Llama', NULL, 'Lama glama', NULL, 'Mountains', 'No', NULL, NULL),
(11, 'Rabbit', NULL, 'Oryctolagus cuniculus', NULL, 'Farms', 'Yes', NULL, NULL),
(12, 'Turkey', NULL, 'Meleagris gallopavo', NULL, 'Farms', 'No', NULL, NULL),
(13, 'Alpaca', NULL, 'Vicugna pacos', NULL, 'Mountains', 'No', NULL, NULL),
(14, 'Donkey', NULL, 'Equus africanus asinus', NULL, 'Farms', 'Yes', NULL, NULL),
(15, 'Zebra', NULL, 'Equus zebra', NULL, 'Savannas', 'Yes', NULL, NULL),
(16, 'Bison', NULL, 'Bison bison', NULL, 'Grasslands', 'No', NULL, NULL),
(17, 'Ostrich', NULL, 'Struthio camelus', NULL, 'Grasslands', 'Yes', NULL, NULL),
(18, 'Kudu', NULL, 'Tragelaphus strepsiceros', NULL, 'Woodlands', 'Yes', NULL, NULL),
(19, 'Wildebeest', NULL, 'Connochaetes', NULL, 'Savannas', 'Yes', NULL, NULL),
(20, 'Antelope', NULL, 'Antilopinae', NULL, 'Grasslands', 'Yes', NULL, NULL),
(21, 'Giraffe', NULL, 'Giraffa camelopardalis', NULL, 'Savannas', 'Yes', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `species_usage`
--

CREATE TABLE `species_usage` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `species_id` bigint(20) UNSIGNED NOT NULL,
  `usage_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `country_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `translations`
--

CREATE TABLE `translations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text NOT NULL,
  `language_code` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `treatments`
--

CREATE TABLE `treatments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `livestock_id` bigint(20) NOT NULL,
  `diagnosis` text DEFAULT NULL,
  `therapies` text DEFAULT NULL,
  `surg_proced` text DEFAULT NULL,
  `monitoring_plan` text DEFAULT NULL,
  `follow_up_care` text DEFAULT NULL,
  `cosent` enum('Yes','No') DEFAULT NULL,
  `assessment` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usages`
--

CREATE TABLE `usages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usages`
--

INSERT INTO `usages` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Meat', 'Livestock used primarily for meat production.', '2024-09-25 08:57:35', '2024-09-25 08:57:35'),
(2, 'Dairy', 'Livestock used primarily for dairy production.', '2024-09-25 08:57:35', '2024-09-25 08:57:35'),
(3, 'Skin', 'Livestock used for skin and leather production.', '2024-09-25 08:57:35', '2024-09-25 08:57:35'),
(4, 'Wool', 'Livestock used for wool production.', '2024-09-25 08:57:35', '2024-09-25 08:57:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `role_id` bigint(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `role_id`, `email`, `email_verified_at`, `password`, `remember_token`, `status`, `deleted_at`, `created_at`, `updated_at`) VALUES
(1, 'Dele', 'Lala', 'DeleFab', NULL, 'bunmi.sadiq@gmail.com', NULL, '$2y$12$5jO7hRhDyIy.o80kFCsTMeuk1x9GAwM37zPxbpRTSrIOaTEJ5WXs6', NULL, 'inactive', NULL, '2024-09-18 14:18:26', '2024-09-18 14:18:26'),
(2, 'Victor', 'Syscodes', 'evictor', NULL, 'victor@gmail.com', NULL, '$2y$12$h/MqE2AnLSd.0RRI0NzDiOiZQAJ5fDXznvAkjeDCHZ42/rfMaVJPW', NULL, 'inactive', NULL, '2024-09-18 14:38:44', '2024-09-18 14:38:44'),
(3, 'Samuel', 'Fagbuyi', 'fsamuel', NULL, 'fsamuel@gmail.com', NULL, '$2y$12$cki8Fgj9IX1EBxJYdP6.o.fGqw.aELKvoopFu0dtTIwTvc2FzYNNu', NULL, 'inactive', NULL, '2024-09-18 14:44:25', '2024-09-18 14:44:25'),
(4, 'Samuel', 'Fagbuyi', 'Hameed', NULL, 'sad@gmail.com', NULL, '$2y$12$SmwuBNggyB4eScHlvCWhzutdGTX5AJcvXf3C.gFanC6u9nFx17WU2', NULL, 'inactive', NULL, '2024-09-19 10:55:31', '2024-09-19 10:55:31'),
(5, 'Bunmi', 'Sadiq', 'Bigbums', NULL, 'bigbums@gmail.com', NULL, '$2y$12$xEyVIXuPJjPtq/1xuWkHUerjNMATDpi0DJca87F0Zp7j.1mQSwwRu', NULL, 'inactive', NULL, '2024-09-19 13:49:20', '2024-09-19 13:49:20');

-- --------------------------------------------------------

--
-- Table structure for table `user_language_preferences`
--

CREATE TABLE `user_language_preferences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `language_code` varchar(10) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audits`
--
ALTER TABLE `audits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding_management`
--
ALTER TABLE `breeding_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding_performance_metrics`
--
ALTER TABLE `breeding_performance_metrics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding_records`
--
ALTER TABLE `breeding_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeding_schedules`
--
ALTER TABLE `breeding_schedules`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `breeds`
--
ALTER TABLE `breeds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cities_name_unique` (`name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `countries_name_unique` (`name`),
  ADD UNIQUE KEY `countries_iso_code_unique` (`iso_code`);

--
-- Indexes for table `disease_incidents`
--
ALTER TABLE `disease_incidents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `farms`
--
ALTER TABLE `farms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeding_management`
--
ALTER TABLE `feeding_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feeds`
--
ALTER TABLE `feeds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feeds_feed_type_id_foreign` (`feed_type_id`);

--
-- Indexes for table `feed_distributions`
--
ALTER TABLE `feed_distributions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feed_distributions_feed_schedule_id_foreign` (`feed_schedule_id`);

--
-- Indexes for table `feed_schedules`
--
ALTER TABLE `feed_schedules`
  ADD PRIMARY KEY (`id`),
  ADD KEY `feed_schedules_livestock_group_id_foreign` (`livestock_group_id`),
  ADD KEY `feed_schedules_feed_id_foreign` (`feed_id`);

--
-- Indexes for table `feed_types`
--
ALTER TABLE `feed_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_criteria`
--
ALTER TABLE `group_criteria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `group_criteria_livestock_group`
--
ALTER TABLE `group_criteria_livestock_group`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `handling_event_management`
--
ALTER TABLE `handling_event_management`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `housing_mvmt_mgmt`
--
ALTER TABLE `housing_mvmt_mgmt`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventories`
--
ALTER TABLE `inventories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `languages`
--
ALTER TABLE `languages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `languages_name_unique` (`name`),
  ADD UNIQUE KEY `languages_code_unique` (`code`);

--
-- Indexes for table `livestocks`
--
ALTER TABLE `livestocks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `livestocks_tag_id_unique` (`tag_id`),
  ADD KEY `livestocks_species_id_foreign` (`species_id`);

--
-- Indexes for table `livestock_groups`
--
ALTER TABLE `livestock_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `localizatn_tracking`
--
ALTER TABLE `localizatn_tracking`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `nutritional_requirements`
--
ALTER TABLE `nutritional_requirements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pedigrees`
--
ALTER TABLE `pedigrees`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `posts_user_id_foreign` (`user_id`);

--
-- Indexes for table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `privileges_name_unique` (`name`);

--
-- Indexes for table `reproduction_monitoring`
--
ALTER TABLE `reproduction_monitoring`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_privilege`
--
ALTER TABLE `role_privilege`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `species`
--
ALTER TABLE `species`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `species_usage`
--
ALTER TABLE `species_usage`
  ADD PRIMARY KEY (`id`),
  ADD KEY `species_usage_species_id_foreign` (`species_id`),
  ADD KEY `species_usage_usage_id_foreign` (`usage_id`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `translations`
--
ALTER TABLE `translations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `translations_key_language_code_unique` (`key`,`language_code`),
  ADD KEY `translations_language_code_foreign` (`language_code`);

--
-- Indexes for table `treatments`
--
ALTER TABLE `treatments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usages`
--
ALTER TABLE `usages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_username_unique` (`username`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_language_preferences`
--
ALTER TABLE `user_language_preferences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_language_preferences_user_id_foreign` (`user_id`),
  ADD KEY `user_language_preferences_language_code_foreign` (`language_code`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audits`
--
ALTER TABLE `audits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeding_management`
--
ALTER TABLE `breeding_management`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeding_performance_metrics`
--
ALTER TABLE `breeding_performance_metrics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeding_records`
--
ALTER TABLE `breeding_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeding_schedules`
--
ALTER TABLE `breeding_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `breeds`
--
ALTER TABLE `breeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `disease_incidents`
--
ALTER TABLE `disease_incidents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farms`
--
ALTER TABLE `farms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feeding_management`
--
ALTER TABLE `feeding_management`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feeds`
--
ALTER TABLE `feeds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed_distributions`
--
ALTER TABLE `feed_distributions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed_schedules`
--
ALTER TABLE `feed_schedules`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feed_types`
--
ALTER TABLE `feed_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `group_criteria`
--
ALTER TABLE `group_criteria`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `group_criteria_livestock_group`
--
ALTER TABLE `group_criteria_livestock_group`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `handling_event_management`
--
ALTER TABLE `handling_event_management`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `housing_mvmt_mgmt`
--
ALTER TABLE `housing_mvmt_mgmt`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `inventories`
--
ALTER TABLE `inventories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `languages`
--
ALTER TABLE `languages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `livestocks`
--
ALTER TABLE `livestocks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `livestock_groups`
--
ALTER TABLE `livestock_groups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `localizatn_tracking`
--
ALTER TABLE `localizatn_tracking`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `nutritional_requirements`
--
ALTER TABLE `nutritional_requirements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `pedigrees`
--
ALTER TABLE `pedigrees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reproduction_monitoring`
--
ALTER TABLE `reproduction_monitoring`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `role_privilege`
--
ALTER TABLE `role_privilege`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `species`
--
ALTER TABLE `species`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `species_usage`
--
ALTER TABLE `species_usage`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `translations`
--
ALTER TABLE `translations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `treatments`
--
ALTER TABLE `treatments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usages`
--
ALTER TABLE `usages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user_language_preferences`
--
ALTER TABLE `user_language_preferences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feeds`
--
ALTER TABLE `feeds`
  ADD CONSTRAINT `feeds_feed_type_id_foreign` FOREIGN KEY (`feed_type_id`) REFERENCES `feed_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `feed_distributions`
--
ALTER TABLE `feed_distributions`
  ADD CONSTRAINT `feed_distributions_feed_schedule_id_foreign` FOREIGN KEY (`feed_schedule_id`) REFERENCES `feed_schedules` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `feed_schedules`
--
ALTER TABLE `feed_schedules`
  ADD CONSTRAINT `feed_schedules_feed_id_foreign` FOREIGN KEY (`feed_id`) REFERENCES `feeds` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feed_schedules_livestock_group_id_foreign` FOREIGN KEY (`livestock_group_id`) REFERENCES `livestock_groups` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `livestocks`
--
ALTER TABLE `livestocks`
  ADD CONSTRAINT `livestocks_species_id_foreign` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `species_usage`
--
ALTER TABLE `species_usage`
  ADD CONSTRAINT `species_usage_species_id_foreign` FOREIGN KEY (`species_id`) REFERENCES `species` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `species_usage_usage_id_foreign` FOREIGN KEY (`usage_id`) REFERENCES `usages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `translations`
--
ALTER TABLE `translations`
  ADD CONSTRAINT `translations_language_code_foreign` FOREIGN KEY (`language_code`) REFERENCES `languages` (`code`) ON DELETE CASCADE;

--
-- Constraints for table `user_language_preferences`
--
ALTER TABLE `user_language_preferences`
  ADD CONSTRAINT `user_language_preferences_language_code_foreign` FOREIGN KEY (`language_code`) REFERENCES `languages` (`code`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_language_preferences_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
