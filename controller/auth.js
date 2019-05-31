const User = require('../models/user');

exports.auth = async (req, res) => {
    const uid = req.decoded.user_id;

    try {
        const existingUser = await User.findOne({uid: uid});
        if (existingUser) {
            // Login
            return {
                "code": 1,
                "success": true,
                "message": "Login successful",
                "finished": existingUser.name != null
            }
        } else {
            // Sign-Up
            const provider = req.decoded.firebase.sign_in_provider;

            const createdUser = await User.create({
                email: req.decoded.email,
                uid: uid,
                provider: provider
            });
            
            if (createdUser) {
                console.log('Created a user');
                return {
                    "code": 2,
                    "success": true,
                    "message": "Signup successful",
                };
            } else {
                console.log("Failed to sign-up");
                return res.code(500);
            }
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}

exports.finishProfile = async (req, res) => {
    const uid = req.decoded.user_id;
    const { name, mobile } = req.body;

    try {
        const foundUser = await User.findOne({uid: uid});
        if (foundUser && !foundUser.name) {
            foundUser.name = name;
            foundUser.mobile = mobile;
            await foundUser.save();
            return {
                "sucess": true
            }
        } else {
            console.log('No user found');
            return res.code(404);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}