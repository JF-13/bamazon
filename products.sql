USE bamazon;

CREATE TABLE products (
	item_id INTEGER(11) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(30),
	department_name VARCHAR(30),
	price DECIMAL(5, 2),
	stock_quantity INTEGER(11),
	PRIMARY KEY(item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("milk", "food", 2.99, 36),
("eggs", "food", 4.02, 41),
("orange juice", "food", 3.55, 35),
("bread", "food", 2.74, 30),
("soap", "household", 1.99, 52),
("deodorant", "household", 3.57, 20),
("razor", "household", 5.83, 15),
("gum", "misc", 2.25, 20),
("charger", "misc'", 15.98, 5),
("aspirin", "misc", 6.19, 11);
