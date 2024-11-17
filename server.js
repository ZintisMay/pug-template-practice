const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

// Set the view engine to Pug
app.set("view engine", "pug");
app.set("views", "./views");

const products = [
  { name: "Coffee", price: "15", size: "64", measurement: "oz" },
  { name: "Milk", price: "5", size: "90", measurement: "oz" },
  { name: "Hummus", price: "7", size: "12", measurement: "oz" },
  { name: "Coffee Filters", price: "3", size: "200", measurement: "count" },
];

// Define a route
app.get("/", (req, res) => {
  res.render("index", {
    title: "Hello from Pug!",
    content: "this is the content",
  });
});

app.get("/list", (req, res) => {
  res.render("productList", {
    title: "Products",
    products,
  });
});

app.get("/products/:id", (req, res) => {
  console.log(req.params);
  let product = products[req.params.id];
  res.render("productPage", {
    product,
  });
});

app.get("/newProduct/:name/:price/:size/:measurement", (req, res) => {
  const { name, price, size, measurement } = req.params;
  products.push({ name, size, price, measurement });
  const lastItemIndex = products.length - 1;
  res.redirect(`/products/${lastItemIndex}`);
});

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
