// importing express
var express = require("express");

// importing routes
const apiRoutes = ("./routes/apiRoutes");
const htmlRoutes = ("./routes/htmlRoutes");

// importing path to work with html routes
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;


app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// use public folder for static files using html and api routes
app.use("/index.js", express.static(path.join(__dirname, "../public/index.js")));
app.use("/api", htmlRoutes);
app.use("/", htmlRoutes);

// let us know this app is listening @ PORT 3000
app.listen(PORT, function () {
    console.log("app listening on PORT" + PORT)
});