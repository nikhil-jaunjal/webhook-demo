const mongoose = require('mongoose');
const User = mongoose.Schema({
    firstName : {type:String},
    lastName : {type:String},
    email : {type:String}
});

module.exports = mongoose.model('User',User);