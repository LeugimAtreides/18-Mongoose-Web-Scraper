// set up the jQuery to run only when the document is fully loaded
$(document).on("ready", function () {

    // Grab all the articles as a JSON
    $(document).on("click", "#scrape-news", function (event) {
        console.log("Mic Check");
        $.get("/scrape", function (data) {

            var hbsOjbect = {
                Article: {
                    title: data.title,
                    link: data.link,
                    id: data._id,
                    exists: data.exists,
                }
            };
            console.log(hbsOjbect);
            render("index", hbsOjbect)
        });
    });

    // add functionality to the add-comment button
    $(".add-comment").on("click", function () {

        // Save the id from the comment
        var commentId = $(this).attr("data-id");

        // run ajax post
        $.ajax({
            method: "POST",
            url: "/articles/" + commentId,
            data: {
                // value taken from the title 
                title: $(".comment-body").val()
            }
        }).then(function(data) {
            // log response
            console.log(data);
            // empty the comment
            $("comment-body").empty();
        });
        // empty out the text field again
        $(".comment-body").val("");

        if (data.comment) {

            var thread = $("<div>");
            thread.addClass(".card");
            thread.append("<p class='lead'>" + data.comment.body + "</p>")
            $("#article").append(thread)
        }
    })

})