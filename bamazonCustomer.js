var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3030,
    user: "root",

    password: "Advance1",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;

    displayProducts();
    serTimeout(shop, 3000);

});

function displayProducts(){
    connection.query("SELECT * FROM products", function(err, res){

        console.log("--------------------------------");
        console.log("ID |   Product |   Price");
        console.log("--------------------------------");
            for(var i=0; i< res.length; i++){
                console.log(res[i].item_id + "  |   " + res[i].product_name + " |   " + "$" + res[i].price);
                console.log("--------------------------------");
            }
    })
};



function shop(){
    connection.query("SELECT * FROM products", function(err, res){

        inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: function(){
                    var choiceArray = [];
                    for(var i=0; i<res.length; i++){
                        choiceArray.push(res[i].item_id.toString());
                    }
                    return choiceArray;
                }
                message: "Select the ID of the product to buy the item"
            }
            {
                name: "quantity",
                type: "list",
                choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
                message: "Select the quantity of the product that you would like to purchase"
            }
        ])
            .then(function(answer){
                var chosenItem;
                for(i=0; i<res.length; i++){
                    if( res[i].item_id === parseInt(answer.choice)){
                        chosenItem = res[i];
                    }
                }
                    var totalPaid = chosenItem.price * answer.quantity;

                    if(chosenItem.stock_quantity >= parseInt(answer.quantity)){
                        connection.query(
                            "Update prodcuts Set ? Where ?",
                            [{
                                stock_quantity: chosenItem.stock_quantity - answer.quantity
                            },
                            {
                                item_id: chosenItem.item_id
                            }
                            ],
                            function(err){
                                if (error) throw err;
                                console.log("Your purchase was successful, you card will be charged $" + totalPaid);
                                setTimeout(displayProducts, 3000);
                                setTimeout(shop, 5000);
                            }
                        )

                    }
                    else{
                        console.log("Sorry, insufficient quantity of product available in stock. Please select another product or quantity");
                        setTimeout(displayProducts, 3000);
                        setTimeout(shop, 5000);
                    }
            });
    } );
};