const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.set("view engine", "ejs");

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

db.connect((err) => {
  if (err) {
    console.log("error: ", err);
  }
  console.log("MySQL Connected...");
});

app.use("/", require("./routes/post"));
app.use("/auth", require("./routes/auth"));

app.listen(3000, () => console.log("Server Initiated on port 3000.."));
