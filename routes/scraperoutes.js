// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");



// Require all models
var db = require("../models");

module.exports = function(app){
    app.get("/scrape", function(req, res) {
        // First, we grab the body of the html with axios
        axios.get("http://www.nfl.com/news").then(function(response) {
          // Then, we load that into cheerio and save it to $ for a shorthand selector
          var $ = cheerio.load(response.data);
      
          // Now, we grab every h2 within an article tag, and do the following:
          $("a").attr("class", "heading").each(function(i, element) {
            // Save an empty result object
            var result = {};
      
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
              .text();
            result.link = $(this)
              .attr("href");
            result.exists = true;
      
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
              .then(function(dbArticle) {
                // View the added result in the console
                console.log(dbArticle);
              })
              .catch(function(err) {
                // If an error occurred, log it
                console.log(err);
              });
          });
      
          // Send a message to the client
          res.send("Scrape Complete");
        });
      });
}