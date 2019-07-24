var db = require("../models");

module.exports = function (app) {
    // load index page
    // Route for getting all Articles from the db
    app.get("/", function (req, res) {
        // Using our Article model, "find" every book in our db
        db.Article.find({})
            .then(function (dbArticles) {
                // If any Articles are found, send them to the client
                res.render("index", {
                    msg: "Scrape Complete!",
                    articles: dbArticles
                })
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
        // TODO: Finish the route so it grabs all of the articles
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });

}