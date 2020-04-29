DROP PROCEDURE IF EXISTS create_customer;

DELIMITER //

CREATE PROCEDURE create_customer (IN new_username VARCHAR(25),
                                  IN `password` VARCHAR(25),
                                  IN first_name VARCHAR(50),
                                  IN last_name VARCHAR(50),
                                  IN new_email VARCHAR(75),
                                  IN phone VARCHAR(15))
BEGIN
    IF EXISTS(SELECT username, email FROM customers WHERE customers.username = new_username OR customers.email = new_email)
    THEN SIGNAL SQLSTATE "45000"
    SET MESSAGE_TEXT = "Error: Username or email address is in use";

    ELSEIF EXISTS(SELECT username, email FROM business_owners WHERE business_owners.username = new_username OR business_owners.email = new_email)
    THEN SIGNAL SQLSTATE "45000"
    SET MESSAGE_TEXT = "Error: Username or email address is in use";
    
    ELSE
        START TRANSACTION;
            INSERT INTO customers (username, `password`, first_name, last_name, email, phone)
            VALUES (new_username, `password`, first_name, last_name, new_email, phone);
        COMMIT;
    END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS create_business_owner_with_business;

DELIMITER //

CREATE PROCEDURE create_business_owner_with_business (IN new_username VARCHAR(25),
                                                      IN `password` VARCHAR(25),
                                                      IN first_name VARCHAR(50),
                                                      IN last_name VARCHAR(50),
                                                      IN new_email VARCHAR(75),
                                                      IN phone VARCHAR(15),
                                                      IN business_name VARCHAR(25),
                                                      IN business_description TEXT,
                                                      IN business_address VARCHAR(50),
                                                      IN business_city VARCHAR(50),
                                                      IN business_province CHAR(2),
                                                      IN business_category ENUM("Bakery", "Café", "Clothing", "Floral", "Gifts", "Grocery", "Medical", "Restaurant", "Services", "Other"))
BEGIN
    IF EXISTS(SELECT username, email FROM customers WHERE customers.username = new_username OR customers.email = new_email)
    THEN SIGNAL SQLSTATE "45000"
    SET MESSAGE_TEXT = "Error: Username or email address is in use";

    ELSEIF EXISTS(SELECT username, email FROM business_owners WHERE business_owners.username = new_username OR business_owners.email = new_email)
    THEN SIGNAL SQLSTATE "45000"
    SET MESSAGE_TEXT = "Error: Username or email address is in use";
    
    ELSE
        START TRANSACTION;
            INSERT INTO businesses (`name`, `description`, `address`, city, province, category)
            VALUES (business_name, business_description, business_address, business_city, business_province, business_category);
            INSERT INTO business_owners (username, `password`, first_name, last_name, email, phone, business_id)
            VALUES (new_username, `password`, first_name, last_name, new_email, phone, LAST_INSERT_ID());
        COMMIT;
    END IF;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS create_product;

DELIMITER //

CREATE PROCEDURE create_product (IN `name` VARCHAR(25),
                                 IN `description` TEXT,
                                 IN `type` ENUM("product", "voucher"),
                                 IN cost DECIMAL(9,2),
                                 IN `image` BLOB,
                                 IN stock_remaining INTEGER,
                                 IN business_id INTEGER)
BEGIN
    START TRANSACTION;
        INSERT INTO products (`name`, `description`, `type`, cost, `image`, stock_remaining)
        VALUES (`name`, `description`, `type`, cost, `image`, stock_remaining);
        INSERT INTO businesses_products (business_id, product_id)
        VALUES (business_id, LAST_INSERT_ID());
    COMMIT;
END //

DELIMITER ;

DROP PROCEDURE IF EXISTS purchase_product;

DELIMITER //

CREATE PROCEDURE purchase_product (IN product_id INTEGER,
                                   IN customer_id INTEGER,
                                   IN quantity INTEGER)
BEGIN   
    START TRANSACTION;
        SET @stock = (SELECT stock_remaining FROM products WHERE products.id = product_id);

        IF @stock - quantity < 0
        THEN SIGNAL SQLSTATE "45000"
        SET MESSAGE_TEXT = "Error: Insufficient stock";

        ELSE
            START TRANSACTION;
                UPDATE products
                SET stock_remaining = stock_remaining - quantity
                WHERE products.id = product_id;

                INSERT INTO customers_products (customer_id, product_id, quantity)
                VALUES (customer_id, product_id, quantity);
            COMMIT;
        END IF;
END //

DELIMITER ;