DROP DATABASE conation;
CREATE DATABASE conation;
USE conation;

CREATE TABLE customers (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(25) UNIQUE NOT NULL,
    `password` VARCHAR(25) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(75) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created DATE NOT NULL DEFAULT (CURRENT_DATE),
    amount_donated DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE businesses (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` TEXT,
    `address` VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province CHAR(2) NOT NULL,
    category ENUM("Bakery", "Café", "Clothing", "Floral", "Gifts", "Grocery", "Medical", "Restaurant", "Services", "Other") NOT NULL,
    donations_received DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE TABLE business_owners (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    username VARCHAR(25) UNIQUE NOT NULL,
    `password` VARCHAR(25) NOT NULL,
    verified BOOLEAN DEFAULT FALSE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(75) UNIQUE NOT NULL,
    phone VARCHAR(15) NOT NULL,
    created DATE NOT NULL DEFAULT (CURRENT_DATE),
    business_id INTEGER,
        FOREIGN KEY (business_id) REFERENCES businesses(id)
);

CREATE TABLE products (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `description` TEXT,
    `type` ENUM("product", "voucher") NOT NULL,
    cost DECIMAL(9,2) NOT NULL,
    `image` BLOB,
    stock_remaining INTEGER
);

CREATE TABLE businesses_products (
    business_id INTEGER NOT NULL,
        FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE TABLE customers_products (
    customer_id INTEGER NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);