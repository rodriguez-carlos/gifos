const apiKey = "?api_key=NhkbTXgn9v5BTORkUVCY0S5hiaabOOip"

const trendingURL = "https://api.giphy.com/v1/gifs/trending"

fetch(`${trendingURL}${apiKey}&limit=4`)
    .then(response => response.json())
    .then(data => {
        data.data.forEach((item, index) => {
            const gifSuggestion = document.createElement("div")
            gifSuggestion.setAttribute("class", "gif-suggestion")
            const gifSuggestionHeader = document.createElement("div")
            gifSuggestionHeader.setAttribute("class", "gif-suggestion-header")
            const gifSuggestionGif = document.createElement("div")
            gifSuggestionGif.setAttribute("class", "gif-suggestion-gif")
            const gifSuggestionGifImg = document.createElement("img")
            gifSuggestionGifImg.setAttribute("src", item.images.original.webp)
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
            trendingGifImg.setAttribute("src", item.images.original.webp)
            function addFooter() {trendingGif.appendChild(trendingGifFooter)}
            function removeFooter() {trendingGif.removeChild(trendingGifFooter)}
            trendingGif.addEventListener("mouseover", addFooter)
            trendingGif.addEventListener("mouseout", removeFooter)
        })
    })


const searchButton = document.querySelector(".search-button")

searchButton.addEventListener("click", () => {
    const searchField = document.querySelector(".search-field-div input")
    const searchQuery = searchField.value
    search(searchQuery)
})

function search(searchQuery) {
    fetch()
}