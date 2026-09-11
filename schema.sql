-- ==============================================================================
-- LexFlow Master Database Schema & Initial Seed Data
-- Compatible with MySQL 8.0+
-- Run this in your MySQL client (VS Code MySQL extension, MySQL Workbench, etc.)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `dvara`;
USE `dvara`;

-- 1. Cases Table
CREATE TABLE IF NOT EXISTS `cases` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_number` VARCHAR(64) UNIQUE,
    `filing_id` VARCHAR(64),
    `filing_status` VARCHAR(32) DEFAULT 'SUBMITTED',
    `assigned_judge_id` VARCHAR(64),
    `assigned_courtroom` VARCHAR(128),
    `title` VARCHAR(255) NOT NULL,
    `category` VARCHAR(64),
    `case_type` VARCHAR(128),
    `court` VARCHAR(128),
    `judge` VARCHAR(128),
    `current_stage` VARCHAR(128),
    `priority` VARCHAR(32),
    `status` VARCHAR(32) DEFAULT 'Active',
    `assigned_lawyer` VARCHAR(128),
    `filing_date` DATE,
    `registration_date` DATE,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Litigating Parties Table
CREATE TABLE IF NOT EXISTS `parties` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64),
    `name` VARCHAR(128) NOT NULL,
    `role` VARCHAR(64),
    `contact` VARCHAR(64),
    `lawyer` VARCHAR(128),
    CONSTRAINT `fk_parties_case` FOREIGN KEY (`case_id`) REFERENCES `cases` (`id`) ON DELETE CASCADE
);

-- 3. Scrutiny Deficiencies Table
CREATE TABLE IF NOT EXISTS `deficiencies` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64) NOT NULL,
    `document_id` VARCHAR(64),
    `document_title` VARCHAR(128),
    `raised_by` VARCHAR(128),
    `reason` TEXT,
    `remark` TEXT,
    `status` VARCHAR(32) DEFAULT 'OPEN',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `resolved_at` DATETIME NULL
);

-- 4. Audit Trail Logs Table
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64) NOT NULL,
    `actor` VARCHAR(128),
    `role` VARCHAR(64),
    `action` VARCHAR(64),
    `previous_state` VARCHAR(64),
    `new_state` VARCHAR(64),
    `details` TEXT,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 5. Users Table
CREATE TABLE IF NOT EXISTS `users` (
    `id` VARCHAR(64) PRIMARY KEY,
    `email` VARCHAR(128) UNIQUE NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `name` VARCHAR(128) NOT NULL,
    `role` VARCHAR(64) NOT NULL,
    `bar_registration_number` VARCHAR(64),
    `court` VARCHAR(128),
    `designation` VARCHAR(128)
);

-- 6. Hearings Table
CREATE TABLE IF NOT EXISTS `hearings` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64),
    `case_number` VARCHAR(64),
    `case_title` VARCHAR(255),
    `date` DATE,
    `time` VARCHAR(32),
    `court` VARCHAR(128),
    `judge` VARCHAR(128),
    `purpose` VARCHAR(255),
    `status` VARCHAR(32) DEFAULT 'Scheduled'
);

-- 7. Deadlines Table
CREATE TABLE IF NOT EXISTS `deadlines` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64),
    `case_number` VARCHAR(64),
    `case_title` VARCHAR(255),
    `due_date` DATE,
    `type` VARCHAR(64),
    `status` VARCHAR(32) DEFAULT 'Upcoming',
    `suggested_action` TEXT
);

-- 8. Judicial Orders Table
CREATE TABLE IF NOT EXISTS `judicial_orders` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64) NOT NULL,
    `hearing_id` VARCHAR(64),
    `order_type` VARCHAR(64),
    `title` VARCHAR(255) NOT NULL,
    `issued_by_judge` VARCHAR(128),
    `issued_date` DATE,
    `content` TEXT,
    `document_url` VARCHAR(255),
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 9. Documents Table
CREATE TABLE IF NOT EXISTS `documents` (
    `id` VARCHAR(64) PRIMARY KEY,
    `case_id` VARCHAR(64),
    `title` VARCHAR(255) NOT NULL,
    `document_type` VARCHAR(64),
    `file_url` VARCHAR(255),
    `uploaded_by` VARCHAR(128),
    `status` VARCHAR(32) DEFAULT 'Uploaded',
    `uploaded_at` DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- Seed Users
INSERT INTO `users` (`id`, `email`, `password`, `name`, `role`) VALUES
('u-1', 'judge@lexflow.gov', 'password', 'Hon''ble Justice A. K. Sikri', 'JUDGE'),
('u-2', 'registrar@lexflow.gov', 'password', 'Registrar V. K. Deshmukh', 'REGISTRAR'),
('u-3', 'scrutiny@lexflow.gov', 'password', 'Officer Priya Nair', 'SCRUTINY_OFFICER'),
('u-4', 'advocate@lexflow.org', 'password', 'Adv. Rajesh Verma', 'ADVOCATE'),
('u-5', 'citizen@lexflow.org', 'password', 'Rohan Kumar (Litigant)', 'CITIZEN')
ON DUPLICATE KEY UPDATE `email`=`email`;

-- Seed Cases
INSERT INTO `cases` (`id`, `case_number`, `filing_id`, `filing_status`, `title`, `category`, `case_type`, `court`, `judge`, `current_stage`, `priority`, `status`, `assigned_lawyer`, `filing_date`, `registration_date`) VALUES
('case-cr-001', 'CR-2026-001', 'FL-2026-001', 'REGISTERED', 'State vs Rahul Sharma', 'Criminal', 'Murder / BNSS Sec 103', 'Sessions Court, Division I', 'Hon''ble Justice A. K. Sikri', 'Evidence & Hearing', 'High', 'Active', 'Adv. Rajesh Verma', '2026-01-15', '2026-01-20'),
('case-ni-014', 'NI-2026-014', 'FL-2026-014', 'DEFICIENT', 'Apex Traders vs Rohan Kumar', 'Special / Statutory', 'Cheque Dishonour (Sec 138 NI Act)', 'Metropolitan Magistrate Court Room 2', 'Magistrate V. K. Deshmukh', 'Scrutiny & Preliminary Audit', 'High', 'Active', 'Adv. Sunita Rao', '2026-02-10', NULL)
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Seed Hearings
INSERT INTO `hearings` (`id`, `case_id`, `case_number`, `case_title`, `date`, `time`, `court`, `judge`, `purpose`, `status`) VALUES
('h1', 'case-cr-001', 'CR-2026-001', 'State vs Rahul Sharma', DATE_ADD(CURDATE(), INTERVAL 4 DAY), '10:30 AM', 'Courtroom 4, Sessions Court', 'Hon''ble Justice A. K. Sikri', 'Prosecution Witness Examination (PW-1 & PW-2)', 'Scheduled'),
('h2', 'case-ni-014', 'NI-2026-014', 'Apex Traders vs Rohan Kumar', DATE_ADD(CURDATE(), INTERVAL 7 DAY), '11:15 AM', 'MM Court Room 2', 'Magistrate V. K. Deshmukh', 'Complaint Admission & Verification Oath', 'Scheduled')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Seed Orders
INSERT INTO `judicial_orders` (`id`, `case_id`, `hearing_id`, `order_type`, `title`, `issued_by_judge`, `issued_date`, `content`) VALUES
('ord-101', 'case-cr-001', 'h1', 'PROCEDURAL', 'Order on Summons & Witness Appearance', 'Hon''ble Justice A. K. Sikri', SUBDATE(CURDATE(), INTERVAL 5 DAY), 'Court hereby directs issuing summons to Prosecution Witnesses PW-1 and PW-2 for appearance on next hearing date. Defense counsel granted liberty to inspect seized forensic material.')
ON DUPLICATE KEY UPDATE `id`=`id`;

-- Seed Deficiencies
INSERT INTO `deficiencies` (`id`, `case_id`, `document_title`, `raised_by`, `reason`, `status`) VALUES
('def-001', 'case-ni-014', 'Dishonoured Bank Memo', 'Officer Priya Nair', 'Bank memo seal is unreadable. Upload a certified clear copy from the bank branch.', 'OPEN')
ON DUPLICATE KEY UPDATE `id`=`id`;
