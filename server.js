import express from 'express'
import mysql from "mysql";
import bodyParser from "body-parser"
import session from "express-session"
import CustomerReportRoute from "./routes/customerReportRoute.js"
import staffRoute from "./routes/staffRoute.js"
import appointmentRoute from "./routes/appointmentRoute.js"
import orderRoute from "./routes/orderRoute.js"
import productsRoute from "./routes/productsRoute.js"
import loginRoute from "./routes/loginRoute.js"

const app = express()
const PORT = 4000;

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
////////////////////database connection
const con = mysql.createConnection({
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

//*****************ROUTES********************
//////////////////////////LOGIN
app.use('/', loginRoute)
/////////////////CUSTOMER
app.use('/customerReport', CustomerReportRoute)
//////////////////////STAFF
app.use('/staffReport', staffRoute)
///////////////////////////APPOINTMENT
app.use('/appointment', appointmentRoute)
///////////////////////////ORDER
app.use('/orders', orderRoute)
////////////////////////////////PRODUCTS
app.use('/products', productsRoute)


export default con