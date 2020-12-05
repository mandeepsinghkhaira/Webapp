import express from "express"
import con from "../server.js"
const router = express.Router();


router.get('/', function (req, res) {
    let q = "SELECT * FROM CUSTOMER; SELECT * FROM STAFF; SELECT * FROM BOOKINGS"
    con.query(q, function (err, data) {
        if (err) throw err;
        if (req.session.loggedin) {
            res.render("appointment", { title: 'appointment', data: data });
        } else {
            res.redirect("/")
        }
        res.end();
    })
});

router.post("/registerAppointment", function (req, res) {
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

//*******************delete appointment data
router.get('/deleteAppointment/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM BOOKINGS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/appointment');
});

export default router