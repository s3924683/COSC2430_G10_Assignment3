const searchButton = document.getElementById("search-button");
const searchBox = document.getElementById("search-box")
const priceRange = document.getElementById("price-range")

searchButton.addEventListener(('click'), (e) => {
    const query = searchBox.value
    const price = priceRange.value || 0

    const searchPageUrl = `/search?query=${encodeURIComponent(query)}&price=${encodeURIComponent(price)}`;
    window.location.href = searchPageUrl;
})