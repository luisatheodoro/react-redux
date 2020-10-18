require('dotenv').config();
const User = require('../models/user');

exports.users = function (req, res, next) {
    User.find({}).then(function (users) {
        res.send(users);
    });
}

exports.user = function (req, res, next) {
    User.findById(req.params.id).then(function (user) {
        res.json({email: user.email});
    });
}
