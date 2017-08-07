var mysql = require("mysql");
var inquirer = require("inquirer");
var total = 0;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  printProducts();
});

function printProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("                             ");
    console.log("ITEM ID: NAME / STOCK / PRICE");
    console.log("=============================");
    for(var i = 0; i < res.length; i++){
      console.log(res[i].item_id + ": " + res[i].product_name + "  / " + res[i].stock_quantity + "  / $" + res[i].price);
    }
    console.log("=============================");
  askCustomer();
  });
}

function askCustomer() {
inquirer
  .prompt([{
    name: "id",
    type: "input",
    message: "What is the ID of the product you would like to buy?"
  },
  {
    name: "quantity",
    type: "input",
    message: "How many would you like to buy?"
  }
  ])
  .then(function(answer) {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, { item_id: answer.id }, function(err, res) {
      if (res[0].stock_quantity < answer.quantity) {
        console.log("                             ");
        console.log("INSUFFICIENT QUANTITY!");
        printProducts();
      } else {
        var num = res[0].price * answer.quantity;
        total += (Math.round(num * 100) / 100);
        // total += (res[0].price * answer.quantity);
        var newQuantity = (res[0].stock_quantity - answer.quantity);
        var query = "UPDATE products SET ? WHERE ?";
        connection.query(query, [{
          stock_quantity: newQuantity
        },
        {
          item_id: answer.id
        }], function(err, res){

          console.log("                             ");
          console.log("YOU GOT IT!!");
          console.log("This is your total so far: " + total);
          console.log("Anything else?");
          printProducts();
        });
      }
    });
  });
}
