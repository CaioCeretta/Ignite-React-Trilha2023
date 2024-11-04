-- AlterTable
ALTER TABLE `accounts` MODIFY `refresh_token` TEXT NULL,
    MODIFY `access_token` TEXT NULL;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `bio` TEXT NULL;
