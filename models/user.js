const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true
    },
    name: String,
    email: String,
    mobile: {
        type: String,
        unique: true
    },
    address: {
        address: String,
        city: String,
        state: String,
        zip: String
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', userSchema)