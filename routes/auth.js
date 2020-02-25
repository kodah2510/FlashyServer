var express = require('express');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var fbUser = require('../model/facebookUser');

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.APP_URL + "/auth/facebook/callback"
}, function(accessToken, refreshToken, profile, done) {
    var user = new fbUser(profile);
    fbUser.find({'id': profile.id}).exec(function(err, res) {
        if (err) {
            console.log(err);
            done(err, null);
        } else {
            if (res.length == 0) {
                user.save();
            } else {
                console.log(res);
            }
            done(null, user);
        }
    });
}

))

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/auth/facebook/success', failureRedirect: '/auth/facebook/failure'
}));

router.get('/facebook/success', function(req, res) {
    // get user's flashcards data here
    res.send("success");
})

router.get('/facebook/failure', function(req, res) {
    // how to handle failure
    
    res.send('failure');
});

module.exports = router;