// Bamazon Customer.js

var mysql = require("mysql");
var inquirer = require("inquirer");

// Connect to mysql
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    // removed password for homwework submission. See preso to see screenshots of how it works.
    password: "",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) {
        throw err;
        console.log("connected as id " + connection.threadId);
    }
    start();
});

function start() {
    inquirer.prompt({
        name: "name",
        type: "input",
        message: "******Welcome to the Bamazon Art Supply Store! PRESS ENTER TO VIEW PRODUCTS******"
    }).then(function(res) {
        console.log("Welcome Valued Customer ");
        listProducts();
    })
}

// lists products in inventory
function listProducts() {
    connection.query("SELECT * FROM Products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            console.log("#" + results[i].ItemID + "\nProduct: " + results[i].ProductName + "\nPrice: $" + results[i].Price + "\nQuantity in stock: " + results[i].StockQuantity);
            console.log("|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|");
        }
        buyNow();
    })
}
// prompts for Item ID and the quantity desired
function buyNow() {
    inquirer.prompt([{
            type: "input",
            name: "item",
            message: "Please enter the #ID of the product you wish to buy now",
        },
        {
            type: "input",
            name: "quantity",
            message: "Enter quantity desired: ",
        }
        // updates quantity if inventory is sufficient with total cost or returns "insufficient quantity" if not enough units are available.
    ]).then(function(res) {
        connection.query("SELECT * FROM Products WHERE ItemID = ?", [res.item], function(err, result) {
            total = (result[0].Price * res.quantity).toFixed();
            if (res.quantity > result[0].StockQuantity) {
                console.log("Insufficient quantity");
                stop();
            } else {
                connection.query("UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ItemID = ?", [res.quantity, res.item], function(err, result) {

                    console.log("Total cost: $" + total);
                    stop();
                });
            }
        })
    })
}
// ends
function stop() {
    connection.end(function(err) {
        if (err) throw err;

    })
}
