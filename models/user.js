const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: String,
    email: String,
    provider: String,
    name: String,
    mobile: String,
    verified: {
        type: Boolean,
        default: false,
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