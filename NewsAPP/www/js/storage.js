/*
    Author: Juliana G. Alves - 2019051
    Objective: Functions to handle localStorage variables
*/

// Set a variable news on localStorage
function setItemOnLocalStorage(array, item) {
    // Sort the array by date, every time the variable is updated
    array = sortByDate(array);
    // Set a variable on localStorage with all news received
    localStorage.setItem(item, JSON.stringify(array));
}

// Get the news variable from localStorage
function getItemFromLocalStorage(item) {
    // Get the news variable from localStorage and convert to JSON object
    var news = JSON.parse(localStorage.getItem(item));
    // If it is null, create a new array
    return (news != null) ? news : [];
}

// Sort the array by date
function sortByDate(array) {
    return array.sort(function (article1, article2) {
        //compare the dates
        return new Date(article2.datetime) - new Date(article1.datetime);
    });
}