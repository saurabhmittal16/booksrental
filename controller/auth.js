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