const fastify = require('fastify');
const mongoose = require('mongoose');
const cors = require('cors');
const app = fastify({
    ignoreTrailingSlash: true
});

const mongo_url = "mongodb://localhost:27017/booksrental";

// Firebase initialisation
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.use(cors());

app.register(require('fastify-url-data'), (err) => {});

app.addHook('preHandler', (request, reply, next) => {
    const urlData = request.urlData();
    if (urlData.path === '/' ) {
        // No checking for token if auth routes
        next();
    } else {
        let token = request.headers['authorization'];
        if (token) {
            token = token.split(" ")[1];
            // jsonwebtoken.verify(token, config.secret, (err, decoded) => {
            //     if (err) {
            //         console.log("Verification failed");
            //         // console.log(err);
            //         reply.code(401)
            //         next(new Error("Token expired"));
            //     } else {
            //         request.decoded = decoded;
            //         next();
            //     }
            // });
            console.log('Token', token);
        } else {
            reply.code(401)
            next(new Error("Authentication failed"));
        }
    }
})

app.get('/', async (request, res) => {
    return {
        message: 'Welcome to Books-Rental'
    }
});

app.post('/', async (req, res) => {
    return req.body.name;
});

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB");
            app.listen(8000, '0.0.0.0', function(err, address) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));