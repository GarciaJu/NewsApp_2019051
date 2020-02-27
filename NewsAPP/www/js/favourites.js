/*
    Author: Juliana G. Alves - 2019051
    Objective: Functions to display favourite news on page favourite.html.
*/

// Attach an event handler for the specific element, now and in the future.
$(document).on("pageinit", "#favouritesPage", function() {
    // As soon as the element favouritesPage is showed it will trigger the function getFavouriteNews to load all favourite news
    displayFavouriteNews();
});

// Display all favourites news
function displayFavouriteNews() {

    // Get the favourites variable on localStorage and convert to JSON object
    // Get the news variable on localStorage
    var news = getItemFromLocalStorage("favourites");

    // If there's no article
    if (news.length == 0) {
        // Show the message
        $("#favourites").html("<center class='ui-nodisc-icon ui-alt-icon'>" +
                "<h3 class='title'>No favourite news added.</h3>" +
                "<span class='ui-btn ui-shadow ui-corner-all ui-icon-alert ui-btn-icon-notext ui-btn-center'></span>" +
            "</center>");
        // Break the function execution
        return;
    }

    // For each article in the variable
    news.forEach(article => {

        // Generate HTML with the article information
        var div = "<div class='ui-body ui-body-a ui-corner-all article'>" +
                        "<div class='ui-nodisc-icon ui-alt-icon'>" +
                            "<h3 class='title'>" + article.title + "</h3>" +
                            "<button class='ui-btn ui-shadow ui-corner-all ui-icon-delete ui-btn-icon-notext ui-btn-right'></button>" +
                        "</div>" +
                        "<div class='datetime'>" + getDate(new Date(article.datetime)) + " - " + getTime(new Date(article.datetime)) + "</div>" +
                        "<div class='description'>" +
                            (article.urlToImage != null ? "<img src='" + article.urlToImage + "'/>" : "") +
                            "<div>" +
                                "<p>" + article.description + "</p>" +
                            "</div>" +
                        "</div>" +
                    "</div>";

        // Append to HTML
        $("#favourites").append(div);
    });

    // Attach an event handler for all .article buttons
    $(".article button").click(function() {
        // Execute the function removeFromFavourites when the button is clicked
        // The code $(this) identifies which object was clicked and pass this object to the function
        removeFromFavourites($(this));
    });
}

// Remove the article from Favourites
function removeFromFavourites(obj) {

    // Get the article's title
    var title = obj.parent().find("h3").html();

    // Get the favourites variable on localStorage and convert to JSON object
    var favourites = getItemFromLocalStorage("favourites");

    // Filter articles with different title
    favourites = favourites.filter(article => article.title != title);

    // Update favourites on the localStorage
    setItemOnLocalStorage(favourites, "favourites");

    // Clean div#favourites
    $("#favourites").empty();

    // Display the favourites again
    displayFavouriteNews();
}