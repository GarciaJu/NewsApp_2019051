/*
    Author: Juliana G. Alves - 2019051
    Objective: Functions to display news on page news.html.
*/

var total = 0;

// Attach an event handler for the specific element, now and in the future.
$(document).on("pageinit", "#newsPage", function() {
    // As soon as the element newsPage is showed it will trigger the function displayNews to load all news
    displayNewsByCategory("business");
    displayNewsByCategory("sports");
    displayNewsByCategory("technology");
    verifyTotal();
});

// Display all news got by API
function displayNewsByCategory(category) {

    // Get the category variable on localStorage
    var news = getItemFromLocalStorage(category);
    
    // If there's any article
    if (news.length > 0) {
        $("#news").append("<h2>" + category.toUpperCase() + "</h2>");
    }
    
    // For each article in the variable
    news.forEach(article => {

        // Generate HTML with the article information
        var div = "<div class='ui-body ui-body-a ui-corner-all article'>" +
                        "<div class='ui-nodisc-icon ui-alt-icon'>" +
                            "<h3 class='title'>" + article.title + "</h3>" +
                            // If the Title is in the array, the icon is not displayed
                            (!checkTitleInFavourites(article.title) ? "<button class='ui-btn ui-shadow ui-corner-all ui-icon-star ui-btn-icon-notext ui-btn-right'></button>" : "") +
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
        $("#news").append(div);

        total++;
    });

    // Attach an event handler for all .article buttons
    $(".article button").click(function() {
        // Execute the function addToFavourites when the button is clicked
        // The code $(this) identifies which object was clicked and pass this object to the function
        addToFavourites($(this));
    });
}

// Verify the total of articles
function verifyTotal() {
    // If there's no article
    if (total == 0) {
        // Show the message
        $("#news").html("<center class='ui-nodisc-icon ui-alt-icon'>" +
                "<h3 class='title'>No news to show.</h3>" +
                "<span class='ui-btn ui-shadow ui-corner-all ui-icon-alert ui-btn-icon-notext ui-btn-center'></span>" +
            "</center>");
    }
}

// Add the article in Favourites
function addToFavourites(obj) {

    // Get the article's title
    var title = obj.parent().find("h3").html();

    // Get the favourites variable on localStorage and convert to JSON object
    var favourites = getItemFromLocalStorage("favourites");

    // Get the news variable on localStorage and convert to JSON object
    var business = getItemFromLocalStorage("business");
    var sports = getItemFromLocalStorage("sports");
    var technology = getItemFromLocalStorage("technology");

    // Concatenate all categories
    var news = [].concat(business).concat(sports).concat(technology);

    // Check if the title is in the favourites array
    if (!checkTitleInFavourites()) {
        // Filter the news array by the title and concatenate with the favourites array
        // So, the article will be added in the favourites
        favourites = favourites.concat(news.filter(article => article.title == title));
        // Set a variable on localStorage with all favourites news
        setItemOnLocalStorage(favourites, "favourites");
        // Remove the button from the screen
        obj.remove();
    }
}

// Check if the title is in the favourites array
function checkTitleInFavourites(title) {

    // Get the favourites variable on localStorage and convert to JSON object
    var favourites = getItemFromLocalStorage("favourites");
    
    // Filter the favourites array to check if this title was already in the array
    // If the title is not in the array the return will be 0
    if (favourites.filter(article => article.title == title).length > 0) {
        // Article is already in the array
        return true;
    }
    // Article isn't in the array
    return false;
}

// Go to Favourite Page
function gotoFavouritePage() {
    $.mobile.changePage("favourites.html");
    return false;
}