const sqlite = require("better-sqlite3");

const db = sqlite("products.sqlite");

// Drop the existing table if it exists
db.prepare(`DROP TABLE IF EXISTS products`).run();

// Create the new table
db.prepare(
  `CREATE TABLE IF NOT EXISTS products(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description TEXT,
    name TEXT,
    price REAL,
    image TEXT
  )`
).run();

console.log("Table 'products' has been recreated.");

// Optionally, insert some sample data
db.prepare(
  `INSERT INTO products (name, description, price, image) VALUES ('DANIEL', 'A great product', 12, 'parfume.jpg')`
).run();

db.prepare(
  `INSERT INTO products (name, description, price, image) VALUES ('DANIELA', 'Another great product', 122, 'daniela.jpg')`
).run();

db.prepare(
  `INSERT INTO products (name, description, price, image) VALUES ('roja', 'Yet another product', 44, 'roja.jpg')`
).run();

// Fetch and log all products
const products = db.prepare(`SELECT * FROM products`).all();
console.log(products);
