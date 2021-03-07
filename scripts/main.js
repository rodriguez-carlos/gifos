const apiKey = "?api_key=NhkbTXgn9v5BTORkUVCY0S5hiaabOOip"

const trendingURL = "https://api.giphy.com/v1/gifs/trending"
const searchURL = "https://api.giphy.com/v1/gifs/search"
const getGifByIdURL = "api.giphy.com/v1/gifs/"

let suggestions = ["zelda", "colbert", "luigi", "javascript", "star wars", "environment", "shera", "the office"]

let suggestionsRandomIndex = Math.round(Math.random()*(suggestions.length))
let suggested = suggestions[suggestionsRandomIndex]


fetch(`${searchURL}${apiKey}&limit=4&q=${suggested}`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach((item, index) => {
            const gifSuggestion = document.createElement("div")
            gifSuggestion.setAttribute("class", "gif-suggestion")
            const gifSuggestionHeader = document.createElement("div")
            gifSuggestionHeader.setAttribute("class", "gif-suggestion-header")
            const gifSuggestionGif = document.createElement("div")
            gifSuggestionGif.setAttribute("class", "gif-suggestion-gif")
            gifSuggestionGif.setAttribute("class", "dotted-hover")
            const gifSuggestionGifImg = document.createElement("img")
            gifSuggestionGifImg.setAttribute("src", item.images.original.url)
            const gifSuggestionHeaderP = document.createElement("p")
            const gifSuggestionHeaderX = document.createElement("img")
            gifSuggestionHeaderX.setAttribute("src", "./static/button3.svg")
            document.querySelector(".suggestions").appendChild(gifSuggestion)
            gifSuggestion.appendChild(gifSuggestionHeader)
            gifSuggestion.appendChild(gifSuggestionGif)
            gifSuggestionGif.appendChild(gifSuggestionGifImg)
            gifSuggestionHeader.appendChild(gifSuggestionHeaderP)
            gifSuggestionHeader.appendChild(gifSuggestionHeaderX)
            gifSuggestionHeaderP.innerHTML = `#${item.title}`
        })
    })

fetch(`${trendingURL}${apiKey}&limit=25`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach((item, index) => {
            const trendingGif = document.createElement("div")
            trendingGif.setAttribute("class", "trending-gif")
            const trendingGifFooter = document.createElement("div")
            trendingGifFooter.setAttribute("class", "trending-gif-footer")
            const trendingGifFooterP = document.createElement("p")
            trendingGifFooter.appendChild(trendingGifFooterP)
            trendingGifFooterP.innerHTML = `#${item.title}`
            const trendingGifImg = document.createElement("img")
            document.querySelector(".trending").appendChild(trendingGif)
            trendingGif.appendChild(trendingGifImg)
            trendingGifImg.setAttribute("src", item.images.original.url)
            function addFooter() {trendingGif.appendChild(trendingGifFooter)}
            function removeFooter() {trendingGif.removeChild(trendingGifFooter)}
            trendingGif.addEventListener("mouseover", addFooter)
            trendingGif.addEventListener("mouseout", removeFooter)
        })
    })


const themeSelectButton = document.getElementById("theme-select-button")
const themeSelectText = document.querySelector('.theme-select-text')
const dropdownMenu = document.querySelector(".theme-dropdown-menu")


themeSelectButton.addEventListener("click", () => {
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "flex"
    } else {
        dropdownMenu.style.display = "none"
    }
})

themeSelectText.addEventListener("click", () => {
    if (dropdownMenu.style.display === "none") {
        dropdownMenu.style.display = "flex"
    } else {
        dropdownMenu.style.display = "none"
    }
})

const sailorDayButton = document.querySelector(".theme-sailor-day")
const sailorNightButton = document.querySelector(".theme-sailor-night")
const stylesheetRef = document.getElementById("stylesheet")
const gifOsLogo = document.getElementById("gifos-logo")

sailorDayButton.addEventListener("click", () => {
    stylesheetRef.setAttribute("href", "./styles/index.css")
    gifOsLogo.setAttribute("src", "./static/gifOF_logo.png")
    dropdownMenu.style.display = "none"
})

sailorNightButton.addEventListener("click", () => {
    stylesheetRef.setAttribute("href", "./styles/dark_index.css")
    gifOsLogo.setAttribute("src", "./static/gifOF_logo_dark.png")
    dropdownMenu.style.display = "none"
})

const searchButton = document.querySelector(".search-button")
const searchBar = document.querySelector(".search-bar")
const searchBackButton = document.querySelector(".search-results a")
const searchField = document.querySelector(".search-field-div input")
const lookingGlass = document.querySelector(".search-button img")

searchField.addEventListener('input', (event) => {
    if (event.target.value) {
        searchButton.classList.add('active-search-button')
        searchButton.classList.add('dotted-hover')
        lookingGlass.setAttribute("src", "static/lupa.svg")
    } else {
        searchButton.classList.remove("active-search-button")
        searchButton.classList.remove("dotted-hover")
        lookingGlass.setAttribute("src", "static/lupa_inactive.svg")
    }
})

searchButton.addEventListener("click", () => {
    const resultsBar = document.getElementById("search-results-header")
    const searchQuery = searchField.value
    if (searchQuery) {
        resultsBar.style.display = "flex"
        searchBar.style.display = "none"
        searchBackButton.style.display = "block"
        getSearchResults(searchQuery)
    }
})

function getSearchResults(searchQuery) {
    fetch(`${searchURL}${apiKey}&limit=16&q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            data.data.forEach((item, index) => {
                const gifResult = document.createElement("div")
                gifResult.setAttribute("class", "gif-result")
                const gifResultGif = document.createElement("div")
                gifResultGif.setAttribute("class", "gif-result-gif")
                const gifResultGifImg = document.createElement("img")
                gifResultGifImg.setAttribute("src", item.images.original.url)
                document.querySelector(".search-results-posts").appendChild(gifResult)
                gifResult.appendChild(gifResultGif)
                gifResultGif.appendChild(gifResultGifImg)
            })
        })
}

const myGifsButton = document.querySelector(".nav-link p")
let localStorageArray = []

function appendGif(item) {
    const trendingGif = document.createElement("div")
    trendingGif.setAttribute("class", "trending-gif")
    const trendingGifImg = document.createElement("img")
    document.getElementById("my-gifs-gifs").appendChild(trendingGif)
    trendingGif.appendChild(trendingGifImg)

    fetch(`https://${getGifByIdURL}${item}${apiKey}`)
        .then(response => response.json())
        .then(data => trendingGifImg.setAttribute("src", data.data.images.original.url))
}

function loadMyGifs() {
    let i
    for (i = localStorage.length - 1; i >= 0; i--) {
        let item = localStorage.getItem(localStorage.key(i))
        localStorageArray.push(item)
        console.log(item)
        appendGif(item)
    }
}
const suggestionsHeader = document.getElementById('poof')
const suggestionsContainer = document.querySelector('.suggestions')
const trendingHeader = document.querySelector('.trending-header')
const trendingContainer = document.querySelector('.trending')
const searchResults = document.querySelector('.search-results')

myGifsButton.addEventListener('click', () => {
    searchBar.style.display = "none"
    suggestionsHeader.style.display = "none"
    suggestionsContainer.style.display = "none"
    searchResults.style.display.none = "none"
    trendingHeader.innerHTML = "&nbspMis guifos"
    trendingContainer.style.display = "none"
    loadMyGifs()
})

