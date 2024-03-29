const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    // Firebase UID
    from: String,

    // Firebase UID
    to: String,
    
    // start and end date for rent
    start: Date,
    end: Date,

    // Book listing ID
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },

    // "requested", "accepted", "rejected", "confirmed"
    status: String,

    // request accepted or rejected
    accepted: Boolean,

    // request closed
    closed: {
        type: Boolean,
        default: false
    },

    // if accepted, contact details of both parties
    lender: {
        address: String,
        mobile: String,
        pickup: Date
    },
    lendee: {
        address: String,
        mobile: String,
        delivery: Date
    },
    
    // if rejected, reason for rejection
    reason: String
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('Request', requestSchema);