#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Category = require("./models/category");
const Pedido = require("./models/pedido");
const Product = require("./models/product");
const User = require("./models/user");

const categories = [];
const pedidos = [];
const products = [];
const users = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createCategories();
  await createUsers();
  await createProducts();
  await createPedidos();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name) {
  const category = new Category({ name: name });
  await category.save();
  categories[index] = category;
  console.log(`Added genre: ${name}`);
}

async function pedidoCreate(index, product, user, ammount) {
  const pedido = new Pedido({ product: product, user: user, ammount: ammount });

  await pedido.save();
  pedidos[index] = pedido;
  console.log(`Added pedido: ${product.name} de ${user.fullname}`);
}

async function productCreate(index, name, category, summary, price, stock) {
  const productdetail = {
    name: name,
    summary: summary,
    category: category,
    price: price,
  };
  if (stock != false) productdetail.stock = stock;

  const product = new Product(productdetail);
  await product.save();
  products[index] = product;
  console.log(`Added pedido: ${name} ${index}`);
}

async function userCreate(index, first_name, family_name, cellphone, email) {
  const user = new User({
    first_name: first_name,
    family_name: family_name,
    cellphone: cellphone,
    email: email,
  });
  await user.save();
  users[index] = user;
  console.log(`Added user: ${user.fullname}`);
}

async function createCategories() {
  console.log("Adding categories");
  await Promise.all([
    categoryCreate(0, "Faldas"),
    categoryCreate(1, "Camisas"),
    categoryCreate(2, "Pantalones"),
  ]);
}

async function createProducts() {
  console.log("Adding products");
  await Promise.all([
    productCreate(0, "Colegio La salle", categories[0], "lorem ipsum", 20.5, 0),
    productCreate(
      1,
      "Colegio La salle Margarita",
      categories[1],
      "lorem ipsum",
      15.0,
      false
    ),
    productCreate(
      2,
      "Colegio Santa teresita",
      categories[2],
      "lorem ipsum",
      10.0,
      400
    ),
    productCreate(
      3,
      "Colegio La academia",
      categories[2],
      "lorem ipsum",
      12.5,
      false
    ),
    productCreate(
      4,
      "Colegio Abel Bravo",
      categories[1],
      "lorem ipsum",
      19.5,
      20
    ),
  ]);
}

//function userCreate(index, first_name, family_name, cellphone, email)
async function createUsers() {
  console.log("Adding authors");
  await Promise.all([
    userCreate(0, "Samir", "Fanilla", "4343-3232", "samirfanilla@gmail.com"),
    userCreate(1, "Elena", "Smith", "555-1234", "elenasmith@example.com"),
    userCreate(
      2,
      "Michael",
      "Johnson",
      "555-5678",
      "michaeljohnson@example.com"
    ),
    userCreate(3, "Emily", "Williams", "555-9101", "emilywilliams@example.com"),
    userCreate(4, "David", "Brown", "555-1122", "davidbrown@example.com"),
  ]);
}

async function createPedidos() {
  console.log("Adding pedidos");
  await Promise.all([
    pedidoCreate(0, products[0], users[1], 2),
    pedidoCreate(1, products[0], users[2], 2),
    pedidoCreate(2, products[2], users[1], 2),
    pedidoCreate(3, products[3], users[3], 2),
    pedidoCreate(4, products[4], users[4], 2),
  ]);
}
