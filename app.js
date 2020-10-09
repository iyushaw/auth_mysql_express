const e = require("express");
const path = require("path");
const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')


dotenv.config({
    path: './.env'
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE,
});

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.set('view engine', 'hbs');

db.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Connected to Databse")
    }
});

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(4001, () => {
    console.log("Server Started on http://localhost:4001")
})