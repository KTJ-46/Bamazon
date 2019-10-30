DROP DATABASE if exists bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT,
	product_name VARCHAR(250) NOT NULL, 
	department_name VARCHAR(250) NOT NULL,
	price DECIMAL(6,2) NOT NULL,
	stock_quantity INT(6) NOT NULL, 
	PRIMARY KEY(item_id)
);


INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ('Eggs', 'Groceries', 4.00, 12),
('Marker', 'Office_Supplies', 1.99, 5),
('Digital_Clock', 'Electronics', 25.50, 4),
('Painreliever', 'Health&Wellness', 12.00, 10),
('CarryOn_Backpack', 'Travel', 50.00, 10),
('DSLR_Lens', 'Photography', 225.00, 4),
('Bedsheet', 'Home_Goods', 15.00, 7),
('Sunglasses', 'Sports', 95.49, 6),
('Shampoo', 'Toiletries', 10.00, 8),
('Pillow_Case', 'Home_Goods', 5.00, 10),
('Desk_Lamp', 'Office_Supplies', 17.00, 1) 