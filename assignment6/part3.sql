create database retail_store_test;

use retail_store_test;
#1- Create the required tables for the retail store database based on the tables structure and relationships. (0.5 Grade)
CREATE TABLE Suppliers (
    SupplierID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(200) NOT NULL,
    ContactNumber VARCHAR(50)
);

CREATE TABLE Products (
    ProductID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(200) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL,
    StockQuantity INT NOT NULL,
    SupplierID INT NOT NULL,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers (SupplierID) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Sales (
    SaleID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ProductID INT NOT NULL,
    QuantitySold INT NOT NULL,
    SaleDate DATE NOT NULL,
    FOREIGN KEY (ProductID) REFERENCES Products (ProductID) ON DELETE CASCADE ON UPDATE CASCADE
);

# 2- Add a column “Category” to the Products table. (0.5 Grade)
alter table products add (category varchar(200));

# 3- Remove the “Category” column from Products. (0.5 Grade)
alter table products drop category;

# 4- Change “ContactNumber” column in Suppliers to VARCHAR (15). (0.5 Grade)
alter table suppliers modify contactnumber varchar(15);

# 5- Add a NOT NULL constraint to ProductName. (0.5 Grade)
alter table products modify productname varchar(200) NOT NULL;

# 6- Perform Basic Inserts: (0.5 Grade)
# a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'.
insert into suppliers values (null, 'FreshFoods', '01001234567');

# b. Insert the following three products, all provided by 'FreshFoods':
# i. 'Milk' with a price of 15.00 and stock quantity of 50.
# ii. 'Bread' with a price of 10.00 and stock quantity of 30.
# iii. 'Eggs' with a price of 20.00 and stock quantity of 40.
insert into products values 
(null, 'Milk', 15.00,50 ,1),
(null, 'Bread', 10.00, 30,1),
(null, 'Eggs', 15.00, 40,1);

# c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
insert into sales values (null, 1,2,'2025-05-20');

# 7- Update the price of 'Bread' to 25.00. (0.5 Grade)
update products set price = 25.00 where productID = 2;

# 8- Delete the product 'Eggs'. (0.5 Grade)
delete from products where productid = 3;

# 9- Retrieve the total quantity sold for each product. (0.5 Grade)
select productname, quantitysold
from products as p inner join sales as s
on p.productid = s.productid;

# 10-Get the product with the highest stock. (0.5 Grade)
select * from products
order by stockquantity desc
limit 1;

# 11-Find suppliers with names starting with 'F'. (0.5 Grade)
select * from suppliers where supplierName like 'F%';

# 12-Show all products that have never been sold. (0.5 Grade)
select * from products
where productid not in (select productid from sales);

select *
from products as p
where
    not exists (
        select *
        from sales as s
        where
            s.productid = p.productid
    );

# 13-Get all sales along with product name and sale date. (0.5 Grade)
select  productname, saledate
from products as p
inner join sales as s
on p.productid = s.productid;

# 14-Create a user “store_manager” and give them SELECT, INSERT, and UPDATE permissions on all tables. (0.5 Grade)
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'strong_password';

GRANT
SELECT,
INSERT
,
UPDATE ON retail_store.* TO 'store_manager' @'localhost';


# 15-Revoke UPDATE permission from “store_manager”. (0.5 Grade)

REVOKE
UPDATE ON retail_store.* FROM 'store_manager' @'localhost';


# 16-Grant DELETE permission to “store_manager” only on the Sales table. (0.5 Grade)
GRANT
DELETE ON retail_store.* TO 'store_manager'@'localhost';

SHOW grants for 'store_manager'@'localhost'; --show all permission store manager