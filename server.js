var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();

var PORT = process.env.PORT || 8080;
// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.use(express.static("public/js"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
        defaultLayout: "main"
    })
);
app.set("view engine", "handlebars");

require("./routes/htmlRoutes")(app);
require("./routes/scrapeRoutes")(app);
require("./routes/commentRoutes")(app);

// if  deployed use the deployed database. Otherwise use the local mongoheadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  // Start the server
app.listen(PORT, () => console.log("App running on port " + PORT + "!"));