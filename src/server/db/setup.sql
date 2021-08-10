CREATE TABLE feelfit
    (
        `id` INT NOT NULL AUTO_INCREMENT,
        `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `clubId` INT NOT NULL,
        `count` INT NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = MyISAM;