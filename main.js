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
            document.querySelector(".suggestions").appendChild(gifSuggestion)
            gifSuggestion.appendChild(gifSuggestionHeader)
            gifSuggestion.appendChild(gifSuggestionGif)
            gifSuggestionGif.appendChild(gifSuggestionGifImg)
            gifSuggestionHeader.appendChild(gifSuggestionHeaderP)
            gifSuggestionHeaderP.innerHTML = `#${item.title}`
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