/*
    Author: Juliana G. Alves - 2019051
    Objective: Functions to get news from https://newsapi.org/ and functions for the index.html page.
*/

// Attach an event handler for the specific element, now and in the future.
$(document).on("pageinit", "#index", function () {
    // As soon as the element index is showed it will trigger the three functions below
    getCurrentDateTime();
    //Get news for different categories
    getNewsByCategory("business");
    getNewsByCategory("sports");
    getNewsByCategory("technology");
    gotoNewsPage();
});

// Get the current Date and Time and display on screen
function getCurrentDateTime() {
    var date = new Date();
    $("#date").html(getDate(date));
    $("#time").html(getTime(date));
}

// This function makes a request to get news in Ireland right now
function getNewsByCategory(category) {

    // Define API's URL
    var url = 'http://newsapi.org/v2/top-headlines?' +
        'country=ie&' +
        'category=' + category + '&' +
        'apiKey=4cf06e310e25466dabb55f9ace0f417d';

    // Request through jQuery Ajax GET method
    $.get(url, function (data) { // data is the returned object

        var news = [];

        // For each article returned, map the information
        data.articles.forEach(article => {

            if (!checkTitleInArray(article.title)) {

                //Create a JSON object with only the information that will be showed
                var json = {
                    title: article.title,
                    description: article.description != null ? article.description : "", // null treatment
                    urlToImage:  article.urlToImage,
                    datetime: article.publishedAt
                };

                // Add the JSON object into news Array
                news.push(json);
            }
        });

        setItemOnLocalStorage(news, category);

    }, "json");
}

// Check if the title is in the news array
function checkTitleInArray(title) {

    // Get the news variable on localStorage
    var news = getItemFromLocalStorage("news");

    // Filter the news array to check if this title was already in the array
    // If the title is not in the array the return will be 0
    if (news.filter(article => article.title == title).length > 0) {
        // Article is already in the array
        return true;
    }
    // Article isn't in the array
    return false;
}

// Get a formatted date
function getDate(date) {

    var month = date.getMonth() + 1;
    var day = date.getDate();

    // Format date, ex: dd/MM/yyyy
    var dateStr = (day < 10 ? '0' : '') + day + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        date.getFullYear();

    return dateStr;
}

// Get a formatted time
function getTime(date) {

    var minutes = date.getMinutes();
    var hours = date.getHours();

    // Format time, ex: hh:mm
    var time = (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes;

    return time;
}

// Go to News Page
function gotoNewsPage() {
    // Wait 3 seconds to change the page
    setTimeout(function () {
        $.mobile.changePage("news.html");
        return false;
    }, 3000);
}

// Go to Info Page
function gotoInfoPage() {
    $.mobile.changePage("about.html");
    return false;
}