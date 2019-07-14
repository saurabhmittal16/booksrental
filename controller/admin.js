const Rent = require('../models/rent');
const User = require('../models/user');
const Book = require('../models/book');
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
    const limit = parseInt(req.query.limit, 10) || 10;

    try {
        const data = await Rent
            .find({
                status: {
                    $nin: [ "Delivered", "Returned" ]
                }
            })
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

exports.getUID = async (req, res) => {
    const mobile = req.params.mobile;
    try {
        const user = await User.findOne({mobile: mobile});
        return user ? user.uid : null;
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.addBook = async (req, res) => {
    delete req.body.searched;

    try {
        const createdBook = await Book.create({
            ...req.body
        });

        if (createdBook) {
            console.log("Listing added successfuly");
            return {
                success: true
            }
        } else {
            console.log("Error");
            return res.code(500).send({
                message: "Book creation failed"
            });
        }

    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}