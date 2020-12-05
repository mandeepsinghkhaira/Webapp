import express from "express"
import con from "../server.js"
const router = express.Router();


///////post data into the database
router.post("/registerOrder", function (req, res) {
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
////////////////////get all order data
router.get('/', function (req, res) {
    let q = "SELECT id FROM PRODUCTS; SELECT id FROM CUSTOMER; SELECT id FROM STAFF; SELECT * FROM ORDERS"
    con.query(q, function (err, data) {
        if (err) throw err;
        if (req.session.loggedin) {
            res.render("orders", { title: 'orders', data: data });
        } else {
            res.redirect("/")
        }
        res.end();
    })
});
///////////////////////////delete order
router.get('/deleteorder/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM ORDERS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/orders');

});
export default router