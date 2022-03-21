-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema develop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema develop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `develop` DEFAULT CHARACTER SET utf8 ;
USE `develop` ;

-- -----------------------------------------------------
-- Table `develop`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`users` (
  `id` VARCHAR(255) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`roles` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`project_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`project_status` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`projects`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`projects` (
  `id` VARCHAR(255) NOT NULL,
  `project_status_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL,
  `deadline` DATETIME NULL,
  `created_at` DATETIME NOT NULL,
  `color` VARCHAR(100) NULL,
  `favorite` TINYINT NOT NULL,
  `budget` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_projects_project_status1_idx` (`project_status_id` ASC) VISIBLE,
  CONSTRAINT `fk_projects_project_status1`
    FOREIGN KEY (`project_status_id`)
    REFERENCES `develop`.`project_status` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`members` (
  `id` VARCHAR(255) NOT NULL,
  `users_id` VARCHAR(255) NOT NULL,
  `roles_id` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_members_users_idx` (`users_id` ASC) VISIBLE,
  INDEX `fk_members_roles1_idx` (`roles_id` ASC) VISIBLE,
  INDEX `fk_members_projects1_idx` (`projects_id` ASC) VISIBLE,
  CONSTRAINT `fk_members_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_members_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `develop`.`roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_members_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`task_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`task_status` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`invitations`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`invitations` (
  `id` VARCHAR(255) NOT NULL,
  `sender` VARCHAR(255) NOT NULL,
  `receiver` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `created_at` VARCHAR(45) NOT NULL,
  `seen` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_invitations_sender_idx` (`sender` ASC) VISIBLE,
  INDEX `fk_invitations_receiver_idx` (`receiver` ASC) VISIBLE,
  INDEX `fk_invitations_projects1_idx` (`projects_id` ASC) VISIBLE,
  CONSTRAINT `fk_invitations_sender`
    FOREIGN KEY (`sender`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_invitations_receiver`
    FOREIGN KEY (`receiver`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_invitations_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`sections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`sections` (
  `id` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_sections_projects1_idx` (`projects_id` ASC) VISIBLE,
  CONSTRAINT `fk_sections_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`priorities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`priorities` (
  `id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`tasks` (
  `id` VARCHAR(255) NOT NULL,
  `sections_id` VARCHAR(255) NOT NULL,
  `priorities_id` VARCHAR(255) NOT NULL,
  `task_status_id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NULL,
  `start_date` DATETIME NULL,
  `due_date` DATETIME NULL,
  `created_at` DATETIME NOT NULL,
  `budget` INT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_tasks_sections1_idx` (`sections_id` ASC) VISIBLE,
  INDEX `fk_tasks_priorities1_idx` (`priorities_id` ASC) VISIBLE,
  INDEX `fk_tasks_task_status1_idx` (`task_status_id` ASC) VISIBLE,
  CONSTRAINT `fk_tasks_sections1`
    FOREIGN KEY (`sections_id`)
    REFERENCES `develop`.`sections` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tasks_priorities1`
    FOREIGN KEY (`priorities_id`)
    REFERENCES `develop`.`priorities` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tasks_task_status1`
    FOREIGN KEY (`task_status_id`)
    REFERENCES `develop`.`task_status` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`sessions` (
  `id` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `name` VARCHAR(120) NOT NULL,
  `date` DATETIME NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `description` VARCHAR(255) NULL,
  `created_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_sessions_projects1_idx` (`projects_id` ASC) VISIBLE,
  CONSTRAINT `fk_sessions_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`talking_points`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`talking_points` (
  `id` VARCHAR(255) NOT NULL,
  `sessions_id` VARCHAR(255) NOT NULL,
  `text` VARCHAR(120) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `checked` TINYINT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_talking_points_sessions1_idx` (`sessions_id` ASC) VISIBLE,
  CONSTRAINT `fk_talking_points_sessions1`
    FOREIGN KEY (`sessions_id`)
    REFERENCES `develop`.`sessions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`users_has_sessions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`users_has_sessions` (
  `users_id` VARCHAR(255) NOT NULL,
  `sessions_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`users_id`, `sessions_id`),
  INDEX `fk_users_has_sessions_sessions1_idx` (`sessions_id` ASC) VISIBLE,
  INDEX `fk_users_has_sessions_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_sessions_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_users_has_sessions_sessions1`
    FOREIGN KEY (`sessions_id`)
    REFERENCES `develop`.`sessions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`notes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`notes` (
  `id` VARCHAR(255) NOT NULL,
  `sessions_id` VARCHAR(255) NOT NULL,
  `text` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_notes_sessions1_idx` (`sessions_id` ASC) VISIBLE,
  CONSTRAINT `fk_notes_sessions1`
    FOREIGN KEY (`sessions_id`)
    REFERENCES `develop`.`sessions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`folders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`folders` (
  `id` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_folders_projects1_idx` (`projects_id` ASC) VISIBLE,
  CONSTRAINT `fk_folders_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`files`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`files` (
  `id` VARCHAR(255) NOT NULL,
  `projects_id` VARCHAR(255) NOT NULL,
  `title` VARCHAR(45) NULL,
  `description` VARCHAR(45) NULL,
  `size` INT NULL,
  `file_path` VARCHAR(255) NOT NULL,
  `file_mimetype` VARCHAR(255) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `folders_id` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_files_projects1_idx` (`projects_id` ASC) VISIBLE,
  INDEX `fk_files_folders1_idx` (`folders_id` ASC) VISIBLE,
  CONSTRAINT `fk_files_projects1`
    FOREIGN KEY (`projects_id`)
    REFERENCES `develop`.`projects` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_files_folders1`
    FOREIGN KEY (`folders_id`)
    REFERENCES `develop`.`folders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`time_records`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`time_records` (
  `id` VARCHAR(255) NOT NULL,
  `tasks_id` VARCHAR(255) NOT NULL,
  `users_id` VARCHAR(255) NOT NULL,
  `start` DATETIME NOT NULL,
  `end` DATETIME NOT NULL,
  `created_at` DATETIME NOT NULL,
  `total` INT NOT NULL,
  `description` VARCHAR(120) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_time_records_tasks1_idx` (`tasks_id` ASC) VISIBLE,
  INDEX `fk_time_records_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_time_records_tasks1`
    FOREIGN KEY (`tasks_id`)
    REFERENCES `develop`.`tasks` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_time_records_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `develop`.`users_has_tasks`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `develop`.`users_has_tasks` (
  `users_id` VARCHAR(255) NOT NULL,
  `tasks_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`users_id`, `tasks_id`),
  INDEX `fk_users_has_tasks_tasks1_idx` (`tasks_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_tasks_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `develop`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_tasks_tasks1`
    FOREIGN KEY (`tasks_id`)
    REFERENCES `develop`.`tasks` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
