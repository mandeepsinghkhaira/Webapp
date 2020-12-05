import express from "express"
import con from "../server.js"
import path from "path"
const router = express.Router();
const __dirname = path.resolve(path.dirname(''));


///////post data into the database
router.post('/', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let q = 'SELECT * FROM USERS WHERE username = ? AND password = ?'
    if (username && password) {
        // check if user exists
        con.query(q, [username, password], function (error, data) {
            if (data.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/customerReport');
            }
            else {
                res.redirect('/')
            }
            res.end();
        });
    } else {
        res.redirect('/');
        res.end();
    }
});

////////////////////login.html is set to the root page
router.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));
});
//**********************logout
router.get('/logout', function (req, res) {
    req.session.loggedin = false;
    res.redirect('/');
});

export default router














