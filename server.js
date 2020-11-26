import express, { Router } from 'express'
import mysql from "mysql";
import bodyParser from "body-parser"

const app = express()
const PORT = 4000;


let con = mysql.createConnection({
    host: 'localhost',
    user: 'mandeep',
    database: 'sharonsDB',
    password: 'password'
})
con.connect();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//body-parsers allows me to extract data from post req
app.listen(PORT, function () {
    console.log(`Server running on ${PORT}!`);
});

//******************posts data into the database********************
app.post("/register", function (req, res) {
    let customer = {
        CUSTOMERID: null,
        FNAME: req.body.FNAME,
        SNAME: req.body.SNAME,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        EMAIL: req.body.EMAIL,
    }
    con.query('INSERT INTO CUSTOMER SET ?', customer, function (err, result) {
        if (err) throw err;
        res.render("customer")
        console.log(result);
    });
});

//*****************routes********************

app.get('/', function (req, res) {
    let q = "SELECT * FROM CUSTOMER";
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("customer", { customerData: data });
    })
});

app.get('/customerReport', function (req, res) {
    let q = "SELECT * FROM CUSTOMER";
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("customerReport", { customerData: data });
    })
});