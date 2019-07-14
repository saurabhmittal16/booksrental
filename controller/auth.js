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
                "finished": existingUser.mobile != null
            }
        } else {
            // Sign-Up
            const provider = req.decoded.firebase.sign_in_provider;
            const name = req.body.name;

            const createdUser = await User.create({
                email: req.decoded.email,
                uid: uid,
                name: name,
                provider: provider
            });
            
            if (createdUser) {
                console.log('Created a user');
                return {
                    "code": 2,
                    "success": true,
                    "message": "Signup successful",
                    "finished": false
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
    const { mobile, name, address } = req.body;

    try {
        const foundUser = await User.findOne({uid: uid});
        if (foundUser) {
            foundUser.mobile = mobile ? mobile : foundUser.mobile;
            foundUser.name = name ? name : foundUser.name;
            foundUser.address = address ? address : foundUser.address;
            await foundUser.save();
            return {
                "sucess": true
            }
        } else {
            console.log('No user found');
            return res.code(500);
        }
    } catch (err) {
        console.log(err);
        return res.code(500);
    }
}