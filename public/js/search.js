/*
RMIT University Vietnam
 Course: COSC2430 Web Programming
 Semester: 2023A
 Assessment: Assignment 2
 Author: Group 10
 Acknowledgement: Acknowledge the resources that you use here.
*/

const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box");
const searchForm = document.getElementById("search-form");
const priceRange = document.getElementById("price-range");

searchForm.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const price = priceRange.value || 0;
  const query = searchBox.value;

  const searchPageUrl = `/search?query=${encodeURIComponent(
    query
  )}&price=${encodeURIComponent(price)}`;
  window.location.href = searchPageUrl;
});
