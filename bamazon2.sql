-- Note to self about currency in mySql: "While everything you state about the different fractional field types is correct, currency should NEVER EVER EVER be stored with decimals, it should be stored as INTEGERS. All currencies should be reduced to their base unit, which is not Dollars, it’s Cents. Not only does it help avoid calculation errors in other fractional field types, but it makes currency conversion a hell of a lot easier as your application grows. Not having to deal with fractions, and rounding (at least to a lesser degree) makes a world of difference."https://www.noelherrick.com/blog/always-use-decimal-for-money"


CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (

	ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
    ProductName VARCHAR(50),
    DepartmentName VARCHAR(50) NOT NULL,
    Price DECIMAL(11,2) NOT NULL,
    StockQuantity INTEGER(10),

    PRIMARY KEY (ItemID)
);

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  DepartmentID int(11) NOT NULL AUTO_INCREMENT,
  DepartmentName varchar(50) NOT NULL,
  OverheadCosts decimal(11,2) NOT NULL,
  TotalSales decimal(11,2) NOT NULL DEFAULT "0.00",

  PRIMARY KEY (DepartmentID)
) ;

INSERT INTO products (ItemID,ProductName,DepartmentName,Price,StockQuantity)
VALUES (1, "markers","drawing",12.99,200),(2, "pastels", "drawing", 17.99,200),(3,"pencils","drawing",14.99,200),(4,"charcoal","drawing",11.99,200),(5,"canvas","paper",18.99,200),(6,"sketchbook","paper",16.99,200),(7,"cardstock","paper",6.99,200),(8,"brushes","accessories",15.99,200),(9,"liquitex","accessories",13.99,200),(10,"blotter","accessories",10.99,200);


INSERT INTO departments("DepartmentID", "DepartmentName", "OverheadCosts","TotalSales") VALUES (1,"drawing","999.99","8600.99"),(2,"paper","1500.00","9900.00"),(3,"accessories","799.86","1536.00");


SELECT * FROM products;
SELECT * FROM departments;
