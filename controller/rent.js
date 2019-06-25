const Rent = require('../models/rent');

exports.getRents = async (req, res) => {
    const url = '/activity/rent?'
    const me = req.decoded.user_id;
    let { start, limit } = req.query;
    
    start = parseInt(start, 10) || 5;
    limit = parseInt(limit, 10) || 5;

    try {
        const data = await Rent.find({
            from: me,
        })
        .populate("listing")
        .sort("-1");

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

exports.getLents = async (req, res) => {
    const url = '/activity/lent?'
    const me = req.decoded.user_id;
    let { start, limit } = req.query;
    
    start = parseInt(start, 10) || 5;
    limit = parseInt(limit, 10) || 5;

    try {
        const data = await Rent
        .find({
            to: me,
        })
        .populate("listing")
        .sort("-1");

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