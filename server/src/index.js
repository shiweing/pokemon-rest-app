let express = require('express');
const path = require("path");
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
require('dotenv').config()
let app = express();

let apiRoutes = require("./api-routes");

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Connect to Mongoose and set connection variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pokemon-resthub', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
// app.get('/', (req, res) => res.send('Welcome to the world of Pokemons!'));
app.use("/", express.static(path.join(__dirname, "..", "..", "build")));

// app.get("/", (req, res, next) => {
//     res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
// });

// Use Api routes in the App
app.use('/api', apiRoutes);

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running Pokemon Resthub on port " + port);
});

module.exports = {
    app: app,
    db: db
}