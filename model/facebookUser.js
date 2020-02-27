var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var facebookUserSchema = new Schema({
    id: String,
    name: String,
    email: String,
    picture: {
        width: Number,
        height: Number,
        is_silhouette: Boolean,
        url: String
    }
});

var facebookUser = mongoose.model('facebook_user', facebookUserSchema);

module.exports = facebookUser;