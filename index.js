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

app.addHook('preHandler', async (request, reply, next) => {
    const urlData = request.urlData();
    if (urlData.path === '/s' ) {
        // No checking for token if auth routes
        next();
    } else {
        // let token = request.headers['authorization'];
        let token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjY2NDNkZDM5ZDM4ZGI4NWU1NjAxN2E2OGE3NWMyZjM4YmUxMGM1MzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYm9va3NhcHAtMWY3YTUiLCJhdWQiOiJib29rc2FwcC0xZjdhNSIsImF1dGhfdGltZSI6MTU1OTI0NTAyNSwidXNlcl9pZCI6IjNZcHgzb1VOVHRRcXR0NWtyd1ZFVlZLZmNiQTIiLCJzdWIiOiIzWXB4M29VTlR0UXF0dDVrcndWRVZWS2ZjYkEyIiwiaWF0IjoxNTU5MjQ1MDI1LCJleHAiOjE1NTkyNDg2MjUsImVtYWlsIjoidXNlckBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidXNlckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Dj7vM3ou-3hvhCHzIGwzwJU_DyvAdr5L95sLEHA3sM5WKYGj--eC1yZWsGoLxu8ArqNu6fHW_i_x8ycdEjrcrjZIx9Iz08lVJc2Qe2Jnq2L9q2044GjJtEcI2UR5xNOeveWnAqCjbKVXm2ejMf-XILsKSeXVTji5djQo-RQapOUdZXu-j-Ty6M8_C-zA6Azq0MuukiRgMLs2sGD4Cd-L8z3FIhEmY8Q7hIY2LrURIT5joWgZxdaEEstRBkNrBARpCHjmRov1dba3n-vFTKgt_W8jtWbCnwNnwQYh67IkYQrXwuUKS-wi4j_lNSV4IAnXNhXwUQsKdJ3f5ZySXT2dpw";
        if (token) {
            try {
                const decodedToken = await admin.auth().verifyIdToken(token);
                request.decoded = decodedToken;
                console.log(decodedToken);
                next();
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
})

app.get('/', async (request, res) => {
    return {
        message: 'Welcome to Books-Rental'
    }
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