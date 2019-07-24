var db = require("../models");

module.exports = function(app) {

    app.post("/articles/:id", function(req, res) {
        // TODO
        db.Comment.create(req.body)
          .then(function(dbComment) {
            // If a Book was created successfully, find one library (there's only one) and push the new Book's _id to the Library's `books` array
            // { new: true } tells the query that we want it to return the updated Library -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
              return db.Article.findOneAndUpdate({_id:req.params.id}, {note: dbComment._id}, { new: true });
          })
          .then(function(dbArticle) {
            // If the Library was updated successfully, send it back to the client
            res.json(dbArticle);
          })
          .catch(function(err) {
            // If an error occurs, send it back to the client
            res.json(err);
          });
      });
}