import express from "express"
import con from "../server.js"
const router = express.Router();


///////post data into the database
router.post("/registerProduct", function (req, res) {
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
////////////////////get all product data
router.get('/', function (req, res) {
    let q = "SELECT * FROM PRODUCTS;"
    con.query(q, function (err, data) {
        if (err) throw err;
        if (req.session.loggedin) {
            res.render("products", { title: 'products', data: data });
        } else {
            res.redirect("/")
        }
        res.end();
    })
});
//*******************delete data************************************
router.get('/deleteProduct/(:id)', function (req, res) {
    let id = req.params.id;
    let z = `DELETE FROM PRODUCTS WHERE id=${id}`;
    con.query(z, function (err, data) {
        if (err) console.log(err);
    });
    res.redirect('/products');

});

export default router