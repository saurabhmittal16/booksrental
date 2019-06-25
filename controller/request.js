const Request = require('../models/request');
const Book = require('../models/book');

exports.createRequest = async (req, res) =>  {
    const uid = req.decoded.user_id;
    const { listing, start, end } = req.body;

    try {
        const foundListing = await Book.findOne({ _id: listing, available: true });
        
        // if no listing with the id is found
        if (!foundListing) {
            return res.code(500).send({
                message: "No listing found"
            });
        }

        if (new Date(start) < foundListing.start || new Date(end) > foundListing.end) {
            return res.code(500).send({
                message: "Start or end are wrong"
            });
        }

        try {
            const existingRequest = await Request.findOne({
                listing: listing,
                from: uid,
                to: foundListing.uid,
                status: "initial",
                createdAt: {
                    $lt: new Date()
                }
            });
            
            console.log(existingRequest);

            if (existingRequest) {
                return {
                    success: false,
                    message: "You have already submitted a request"
                }
            }
            
            // create request with status -> "initial"
            const request = await Request.create({
                listing: listing,
                start: start,
                end: end,
                from: uid,
                to: foundListing.uid,
                status: "initial"
            });

            // return request id on successful creation
            console.log("Request submitted");
            return {
                success: true,
                request_id: request._id
            }

        } catch (err) {
            console.log("Request could not be added", err);
            return res.code(500);
        }
    } catch (err) {
        return res.code(500);
    }
}

exports.rejectRequest = async (req, res) => {
    const me = req.decoded.user_id;
    const { id, reason } = req.body;

    try {
        const foundRequest = await Request.findOne({ _id: id, to: me, status: "initial", closed: false });

        // if no request found, return error
        if (!foundRequest) {
            return res.code(500).send({
                message: 'No such request found'
            });
        }

        try {
            // update request info on rejection
            foundRequest.status = "rejected";
            foundRequest.accepted = false;
            foundRequest.reason = reason;
            foundRequest.closed = true;
            await foundRequest.save();

            return {
                success: true,
                message: "Request rejected"
            }

        } catch (err) {
            console.log("Could not update request details");
            return res.code(500);
        }
    } catch (err) {
        console.log("Could not find request");
        return res.code(500);
    }
}

exports.acceptRequest = async (req, res) => {
    const me = req.decoded.user_id;
    const { id, details } = req.body;

    try {
        const foundRequest = await Request.findOne({ _id: id, to: me, status: "initial", closed: false });

        // if no request found, return error
        if (!foundRequest) {
            return res.code(500).send({
                message: 'No such request found'
            });
        }

        try {
            // update request info on rejection
            foundRequest.status = "accepted";
            foundRequest.accepted = true;
            foundRequest.lender = details;
            await foundRequest.save();

            return {
                success: true,
                message: "Request accepted"
            }

        } catch (err) {
            console.log("Could not update request details");
            return res.code(500);
        }
    } catch (err) {
        console.log("Could not find request");
        return res.code(500);
    }
}

exports.confirmRequest = async (req, res) => {
    const me = req.decoded.user_id;
    const { id, details } = req.body;

    try {
        const foundRequest = await Request.findOne({ 
            _id: id, 
            from: me, 
            status: "accepted", 
            closed: false 
        });

        // if no request found, return error
        if (!foundRequest) {
            return res.code(500).send({
                message: 'No such request found'
            });
        }

        try {
            // update request info on rejection
            foundRequest.status = "confirmed";
            foundRequest.accepted = true;
            foundRequest.closed = true;
            foundRequest.lendee = details;

            // To-Do: create a new rent entity and update listing to become unavailable
            await foundRequest.save();

            // also return new rent id
            return {
                success: true,
                message: "Request confirmed",
                rent_id: "some-id"
            }

        } catch (err) {
            console.log("Could not update request details");
            return res.code(500);
        }
    } catch (err) {
        console.log("Could not find request");
        return res.code(500);
    }
}

exports.rentNotifications = async (req, res) => {
    const me = req.decoded.user_id;
    const url = `/notification/rent?`

    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 5;

    try {
        const data = await Request
            .find({
                from: me,
                $or: [
                    { status: "accepted" },
                    { status: "rejected" },
                ]
            })
            .populate('listing')
            .skip(start)
            .limit(limit)
            .sort(-1);

        return {
            limit: limit,
            start: start,
            size: data.length,
            next: data.length < limit ? null : `${url}start=${start+limit}&limit=${limit}`,
            results: data
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.lentNotification = async (req, res) => {
    const me = req.decoded.user_id;
    const url = `/notification/lent?`

    const start = parseInt(req.query.start, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 5;

    try {
        const data = await Request
            .find({
                to: me,
                $or: [
                    { status: "initial" },
                    { status: "rejected" },
                ]
            })
            .populate('listing')
            .skip(start)
            .limit(limit)
            .sort(-1);

        return {
            limit: limit,
            start: start,
            size: data.length,
            next: data.length < limit ? null : `${url}start=${start+limit}&limit=${limit}`,
            results: data
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}