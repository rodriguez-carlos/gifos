const apiKey = "?api_key=NhkbTXgn9v5BTORkUVCY0S5hiaabOOip"

const trendingURL = "https://api.giphy.com/v1/gifs/trending"
const searchURL = "https://api.giphy.com/v1/gifs/search"
const getGifByIdURL = "api.giphy.com/v1/gifs/"

const suggestions = ["zelda", "colbert", "luigi", "community", 
"star wars", "environment", "she-ra", "the office"]



for (let k = 0; k < 4; k++) {
    let suggested = suggestions[k]
    console.log(suggestions[k])
    fetch(`${searchURL}${apiKey}&limit=1&q=${suggestions[k]}`)
        .then(response => response.json())
        .then(data => {
            console.log(suggested)
            const gifSuggestion = document.createElement("div")
            gifSuggestion.setAttribute("class", "gif-suggestion")
            gifSuggestion.setAttribute('id', `suggestion${k}`)
            const gifSuggestionHeader = document.createElement("div")
            gifSuggestionHeader.setAttribute("class", "gif-suggestion-header")
            const gifSuggestionGif = document.createElement("div")
            gifSuggestionGif.setAttribute("class", "dotted-hover")
            const gifSuggestionGifImg = document.createElement("img")
            gifSuggestionGifImg.setAttribute("src", data.data[0].images.original.url)
            const gifSuggestionHeaderP = document.createElement("p")
            const gifSuggestionHeaderX = document.createElement("img")
            const viewMoreButton = document.createElement('div')
            viewMoreButton.classList.add("view-more-button")
            viewMoreButton.classList.add('dotted-hover')
            viewMoreButton.setAttribute('id', suggested)
            viewMoreButton.addEventListener('click', viewMoreClick)
            gifSuggestionGif.appendChild(viewMoreButton)
            viewMoreButton.innerHTML = "Ver más..."
            gifSuggestionHeaderX.setAttribute("src", "./static/button3.svg")
            document.querySelector(".suggestions").appendChild(gifSuggestion)
            gifSuggestion.appendChild(gifSuggestionHeader)
            gifSuggestion.appendChild(gifSuggestionGif)
            gifSuggestionGif.appendChild(gifSuggestionGifImg)
            gifSuggestionHeader.appendChild(gifSuggestionHeaderP)
            gifSuggestionHeader.appendChild(gifSuggestionHeaderX)
            gifSuggestionHeaderP.innerHTML = `#${suggested}`
        })
}


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

function dayMode ()  {
    stylesheetRef.setAttribute("href", "./styles/index.css")
    gifOsLogo.setAttribute("src", "./static/gifOF_logo.png")
    dropdownMenu.style.display = "none"
    localStorage.removeItem('nightTheme')
}
function nightMode ()  {
    stylesheetRef.setAttribute("href", "./styles/dark_index.css")
    gifOsLogo.setAttribute("src", "./static/gifOF_logo_dark.png")
    dropdownMenu.style.display = "none"
    localStorage.setItem('nightTheme', '1')
}

sailorDayButton.addEventListener("click", dayMode)

sailorNightButton.addEventListener("click", nightMode)

if (localStorage.getItem('nightTheme')) {
    nightMode()
}

const searchButton = document.querySelector(".search-button")
const searchBar = document.querySelector(".search-bar")
const searchBackButton = document.querySelector(".search-results a")
const searchField = document.querySelector(".search-field-div input")
const lookingGlass = document.querySelector(".search-button img")

searchField.addEventListener('input', (event) => {
    if (event.target.value) {
        searchButton.classList.add('active-search-button')
        searchButton.classList.add('dotted-hover')
        lookingGlass.classList.add('active-looking-glass')
        if (localStorage.getItem('nightTheme')) {
            lookingGlass.setAttribute("src", "static/lupa_light.svg")
        } else {
            lookingGlass.setAttribute("src", "static/lupa.svg")
        }
    } else {
        searchButton.classList.remove("active-search-button")
        searchButton.classList.remove("dotted-hover")
        lookingGlass.classList.remove('active-looking-glass')
        lookingGlass.setAttribute("src", "static/lupa_inactive.svg")
    }
})

searchButton.addEventListener("click", () => {
    const resultsBar = document.getElementById("search-results-header")
    const searchQuery = searchField.value
    resultsBar.innerHTML = 'Resultados:&nbsp;<i>' + searchQuery + '</i>'
    if (searchQuery) {
        resultsBar.style.display = "flex"
        getSearchResults(searchQuery)
    }
})

function getSearchResults(searchQuery) {
    fetch(`${searchURL}${apiKey}&limit=16&q=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector(".search-results-posts").innerHTML = ""
            data.data.forEach((item, index) => {
                const gifResult = document.createElement("div")
                gifResult.setAttribute("class", "gif-result")
                const gifResultGifImg = document.createElement("img")
                gifResultGifImg.setAttribute("src", item.images.original.url)
                document.querySelector(".search-results-posts").appendChild(gifResult)
                gifResult.appendChild(gifResultGifImg)
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
        if (localStorage.key(i) !== 'nightTheme') {
            localStorageArray.push(item)
            appendGif(item)
        }
    }
}
const suggestionsHeader = document.getElementById('poof')
const suggestionsContainer = document.querySelector('.suggestions')
const trendingHeader = document.querySelector('.trending-header')
const trendingContainer = document.querySelector('.trending')
const searchResults = document.querySelector('.search-results')
const myGifsContainer = document.getElementById('my-gifs-gifs')


myGifsButton.addEventListener('click', () => {
    myGifsContainer.innerHTML = ""
    searchBar.style.display = "none"
    suggestionsHeader.style.display = "none"
    suggestionsContainer.style.display = "none"
    searchResults.style.display = "none"
    trendingHeader.innerHTML = "&nbspMis guifos"
    trendingContainer.style.display = "none"
    loadMyGifs()
})


function viewMoreClick(event) {
    searchField.value = event.target.id
    searchButton.click()
}
