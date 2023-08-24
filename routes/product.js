var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

// display user page
router.get('/', function(req, res, next) {
    dbConn.query('SELECT name, price FROM product UNION SELECT COUNT(id) as cart_number, phone_number from phone_number WHERE phone_number.product_id = 1 GROUP BY id',function(err,rows)     {
        if(err) {
            req.flash('error', err);
            res.render('product',{data:''});
        } else {
            console.log(rows);
            const d = new Date();
            let hour = d.getHours();
            let isValidTime = (hour > 9 && hour < 11) ? true : false
            let data = {
                product_name: rows[0].name,
                price: rows[0].price,
                remain: 20 - (rows.length - 1),
                isValidTime: isValidTime
            }
            res.render('product',{data:data});
        }
    });
});


// add a new user
router.post('/add-to-cart', function(req, res, next) {
    let errors = false;

    let phone_number = req.body.phone_number;

    console.log('ADDED TO CART: ', phone_number);

    if(phone_number.length === 0 || phone_number.length > 20) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter a valid phone number");
        res.redirect('/');
    }

    // if no error
    if(!errors) {

        var form_data = {
            phone_number: phone_number,
            product_id: 1
        }

        // insert query
        dbConn.query('INSERT INTO phone_number SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', JSON.stringify(err));
                res.redirect('/');
            } else {
                req.flash('success', 'Product successfully added to cart');
                res.redirect('/');
            }
        })
    }
})

module.exports = router;