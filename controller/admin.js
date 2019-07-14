const Rent = require('../models/rent');
const config = require('../config');

exports.login = async (req, res) => {
    const password = req.body.password;

    if (password == config.admin)
        return { success: true };

    return res.code(500);
}

exports.getRents = async (req, res) => {
    const url = '/admin/rents?';

    // start -> starting point for books
    const start = parseInt(req.query.start, 10) || 0;
    
    // limit -> number of results to send
    const limit = parseInt(req.query.limit, 10) || 1;

    try {
        const data = await Rent
            .find()
            .populate({
                path: 'listing',
                select: 'name + isbn'
            })
            .skip(start)
            .limit(limit);
        
        return {
            start: start,
            limit: limit,
            size: data.length,
            next: data.length < limit ? null : `${url}start=${start+limit}&limit=${limit}`,
            results: data
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    };
}

exports.updateStatus = async (req, res) => {
    const { id, status } = req.body;

    try {
        const foundRent = await Rent.findOne({
            _id: id
        });
        foundRent.status = status;
        await foundRent.save();

        return {
            success: true
        };
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}