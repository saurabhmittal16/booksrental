const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    // Firebase UID
    from: String,

    // Lender details
    lenderInfo: {
        address: String,
        mobile: String,
        pickup: Date
    },
    
    // Firebase UID
    to: String,

    // Lendee details
    lendeeInfo: {
        address: String,
        mobile: String,
        delivery: Date
    },

    // Listing ID
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    
    // confirmed, picked-up, delivered, returned
    status: {
        type: String,
        default: "Confirmed"
    },

    closed: {
        type: Boolean,
        default: false
    },

    start: Date,
    end: Date
}, {
    versionKey: false
});

module.exports = mongoose.model('Rent', rentSchema);