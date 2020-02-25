var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var facebookUserSchema = new Schema({
    id: String,
    username: String,
    displayName: String,
    name: {
        familyName: String,
        givenName: String,
        middleName: String,
    },
    gender: String,
    profileUrl: String
});

var facebookUser = mongoose.model('facebook_user', facebookUserSchema);

module.exports = facebookUser;