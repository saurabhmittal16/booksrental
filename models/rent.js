const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    lender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recepient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    start: Date,
    end: Date
}, {
    versionKey: false
});

module.exports = mongoose.model('Rent', rentSchema);