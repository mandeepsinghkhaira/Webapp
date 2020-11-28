import express from 'express'
import mysql from "mysql";
import bodyParser from "body-parser"

const app = express()
const PORT = 4000;


let con = mysql.createConnection({
    host: 'localhost',
    user: 'mandeep',
    database: 'sharonsDB',
    password: 'password',
    multipleStatements: true
})
con.connect();
// the mySQL nodejs docs state: Support for multiple statements is disabled for security reasons (it allows for SQL injection attacks if values are not properly escaped). I've had to enable them for the appointment feauture to work.
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//body-parsers allows me to extract data from post req
app.listen(PORT, function () {
    console.log(`Server running on ${PORT}!`);
});

//******************posts data into the database********************
//////////////////CUSTOMER
app.post("/register", function (req, res) {
    let customer = {
        id: null,
        FNAME: req.body.FNAME,
        SNAME: req.body.SNAME,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        EMAIL: req.body.EMAIL
    }
    con.query('INSERT INTO CUSTOMER SET ?', customer, function (err, data) {
        if (err) throw err;
        res.redirect("/customerReport")
        console.log(data);
    });
});
////////////////////STAFF
app.post("/registerStaff", function (req, res) {
    let staff = {
        id: null,
        FNAME: req.body.FNAME,
        SNAME: req.body.SNAME,
        PHONE_NUMBER: req.body.PHONE_NUMBER,
        EMAIL: req.body.EMAIL
    }
    con.query('INSERT INTO STAFF SET ?', staff, function (err, data) {
        if (err) throw err;
        res.redirect("/staffReport")
        console.log(data);
    });
});
///////////////////appointment
app.post("/registerAppointment", function (req, res) {
    let bookings = {
        id: null,
        STAFFID: req.body.STAFFID,
        CUSTOMERID: req.body.CUSTOMERID,
        BOOKING_DATE: req.body.BOOKING_DATE,
        BOOKING_TIME: req.body.BOOKING_TIME
    }
    con.query('INSERT INTO BOOKINGS SET ?', bookings, function (err, data) {
        if (err) throw err;
        res.redirect("/appointment")
        console.log(data);
    });
});
///////////////////orders
app.post("/registerOrder", function (req, res) {
    let orders = {
        id: null,
        PRODUCT_ID: req.body.PRODUCT_ID,
        CUSTOMER_ID: req.body.CUSTOMER_ID,
        STAFF_ID: req.body.STAFF_ID,
        QUANTITY: req.body.QUANTITY
    }
    con.query('INSERT INTO ORDERS SET ?', orders, function (err, data) {
        if (err) console.log(err);
        res.redirect("/orders")
        console.log(data);
    });
});
/////////////////////////products
app.post("/registerProducts", function (req, res) {
    let products = {
        id: null,
        PRODUCT_NAME: req.body.PRODUCT_NAME,
        DEPARTMENT: req.body.DEPARTMENT,
        PRICE: req.body.PRICE,
        STOCK: req.body.STOCK
    }
    con.query('INSERT INTO PRODUCTS SET ?', products, function (err, data) {
        if (err) throw err;
        res.redirect("/products")
        console.log(data);
    });
});

//*****************routes********************
/////////////////CUSTOMER
app.get('/customerReport', function (req, res) {
    let q = "SELECT * FROM CUSTOMER";
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("customerReport", { title: 'customerReport', data: data });
    })
});
//////////////////////STAFF
app.get('/staffReport', function (req, res) {
    let q = "SELECT * FROM STAFF";
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("staffReport", { title: 'staffReport', data: data });
    })
});
///////////////////////////appointment
app.get('/appointment', function (req, res) {
    let q = "SELECT * FROM CUSTOMER; SELECT * FROM STAFF; SELECT * FROM BOOKINGS"
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("appointment", { title: 'appointment', data: data });
    })
});
///////////////////////////orders
app.get('/orders', function (req, res) {
    let q = "SELECT id FROM PRODUCTS; SELECT id FROM CUSTOMER; SELECT id FROM STAFF; SELECT * FROM ORDERS"
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("orders", { title: 'orders', data: data });
    })
});
////////////////////////////////products
app.get('/products', function (req, res) {
    let q = "SELECT * FROM PRODUCTS;"
    con.query(q, function (err, data) {
        if (err) throw err;

        res.render("products", { title: 'products', data: data });
    })
});

//*******************delete data************************************
///////////////////////CUSTOMER
app.get('/deleteCustomer/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM CUSTOMER WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/customerReport');

});
/////////////////////////STAFF
app.get('/deleteStaff/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM STAFF WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/staffReport');
});
//////////////////////////appointment
app.get('/deleteAppointment/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM BOOKINGS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/appointment');
});
///////////////////////////products
app.get('/deleteProduct/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM PRODUCTS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/products');

});
///////////////////////////orders
app.get('/deleteorder/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM ORDERS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/orders');

});
