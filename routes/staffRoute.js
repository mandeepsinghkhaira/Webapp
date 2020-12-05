import express from "express"
import con from "../server.js"
const router = express.Router();


///////post data into the database
router.post("/registerStaff", function (req, res) {
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
////////////////////get all staff data
router.get('/', function (req, res) {
    let q = "SELECT * FROM STAFF";
    con.query(q, function (err, data) {
        if (err) throw err;
        if (req.session.loggedin) {
            res.render("staffReport", { title: 'staffReport', data: data });
        } else {
            res.redirect("/")
        }
        res.end();
    })
});
////////////////////deletes staff data in database
router.get('/deleteStaff/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM STAFF WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/staffReport');
});
export default router