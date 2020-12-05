import express from "express"
import con from "../server.js"
const router = express.Router();

///////post data into the database
router.post("/register", function (req, res) {
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

/////////////////////renders customer page if logged in and selects all data from customer table in the database
router.get('/', function (req, res) {
    let q = "SELECT * FROM CUSTOMER";
    con.query(q, function (err, data) {
        if (err) throw err;
        if (req.session.loggedin) {
            res.render("customerReport", { title: 'customerReport', data: data });
        } else {
            res.redirect("/")
        }
        res.end();
    })
})
/////////////////////////deletes data in customer database
router.get('/deleteCustomer/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM CUSTOMER WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/customerReport');

})

export default router;