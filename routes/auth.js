var express = require('express');
var router = express.Router();

var fbUser = require('../model/facebookUser');


router.post('/facebook', function(req, res) {
    let userData = req.body;
    fbUser.find({ id: req.body.id }, function (err, user) {
        if (err) {
            res.json({
                status: false,
                err: err
            });
        } else {
            if (user.length == 0) {
                // save user
                let newUser = new fbUser({
                    id: userData.id,
                    name: userData.name,
                    email: userData.email,
                    picture: userData.picture.data
                });
                newUser.save();
            }
            res.json({
                status: true,
            });
        }
    });
    
});


module.exports = router;