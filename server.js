import express, { Router } from 'express'
import mysql from "mysql";
import bodyParser from "body-parser"

const app = express()
const PORT = 4000;
var router = express.Router();

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
        id: null,
        FNAME: req.body.FNAME,
        SNAME: req.body.SNAME,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        EMAIL: req.body.EMAIL
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

        res.render("customer", { title: 'view', data: data });
    })
});

app.get('/customerReport', function (req, res) {
    let q = "SELECT * FROM CUSTOMER";
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("customerReport", { title: 'customerReport', data: data });
    })
});
//*******************delete data
app.get('/delete/(:id)', function (req, res, next) {
    let id = req.params.id;
    let z = `DELETE FROM CUSTOMER WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) throw err;
        console.log(data.affectedRows + " record(s) updated");
    });
    res.redirect('/customerReport');

});
