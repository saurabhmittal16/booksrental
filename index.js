const fastify = require('fastify');
const mongoose = require('mongoose');
const cors = require('cors');
const app = fastify({
    ignoreTrailingSlash: true
});

const mongo_url = "mongodb://localhost:27017/booksapp";

// Firebase initialisation
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Routes
const routes = require('./routes/index');

app.use(cors());

app.register(require('fastify-url-data'), (err) => {});

app.addHook('preHandler', async (request, reply, next) => {
    const urlData = request.urlData();

    if (urlData.path === '/') {
        // No checking for token
        next();
    } else {
        let token = request.headers['authorization'];
        if (!!token) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                request.decoded = decodedToken;
                // console.log(decodedToken);
                return;
            } catch (err) {
                console.log("Verification failed", err);
                reply.code(401)
                next(new Error("Token expired"));
            }
        } else {
            reply.code(401)
            next(new Error("Authentication failed"));
        }
    }
});

app.get('/', async (request, res) => {
    return {
        message: 'Welcome to Books-Rental'
    }
});

routes.forEach(route => app.route(route))

mongoose.connect(mongo_url, {useNewUrlParser: true})
    .then(
        () => {
            console.log("Connected to DB");
            app.listen(8080, '0.0.0.0', function(err, address) {
                if (err) {
                    console.log(err);
                    process.exit(1);
                }
                console.log(`Server listening on ${address}`);
            });
        }
    )
    .catch(err => console.log(err.message));