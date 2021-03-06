const apiKey = "NhkbTXgn9v5BTORkUVCY0S5hiaabOOip"
const uploadURL = "upload.giphy.com/v1/gifs"
const getGifByIdURL = "api.giphy.com/v1/gifs/"

const video = document.getElementById('video')
const image = document.getElementById('resulting-gif')
let recorder
let tracks

function uploadGif (uploadURL, apiKey, data) {
    fetch(`https://${uploadURL}?api_key=${apiKey}`, {
        method: "POST",
        body: data
    })
    .then(response => response.json())
    .then(data => {
        addToLocalStorage(data)
        appendGif(data.data.id)
    })
    .catch(() => console.log('Upload was not completed'))
}

function addToLocalStorage(data) {
    localStorage.setItem('gif' + data.data.id, data.data.id)
}

function videoCapture() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 700 }
        }
    })
    .then(function(stream) {
        video.srcObject = stream;
        video.play()
        tracks = video.srcObject.getTracks()
        recorder = RecordRTC(video.srcObject, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            hidden: 240,
          })
    })
    .catch(console.error)
}

let localStorageArray = []

function appendGif(item) {
    fetch(`https://${getGifByIdURL}${item}?api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const trendingGif = document.createElement("div")
            trendingGif.setAttribute("class", "trending-gif")
            const trendingGifImg = document.createElement("img")
            document.querySelector(".trending").appendChild(trendingGif)
            trendingGif.appendChild(trendingGifImg)
            trendingGifImg.setAttribute("src", data.data.images.original.url)
        })
}

function loadMyGifs() {
    let i
    for (i = localStorage.length - 1; i >= 0; i--) {
        let item = localStorage.getItem(localStorage.key(i))
        localStorageArray.push(item)
        appendGif(item)
    }
}

let blobURL
const alertBoxTitle = document.querySelector(".alert-box-title")
const captureBox = document.getElementById("box-capture")
const instructionsBox = document.getElementById("box-instructions")
const boxTitle = document.querySelector(".alert-box-title")
const prepButton = document.getElementById("prep-start-button")
prepButton.addEventListener('click', () => {
    boxTitle.innerHTML = "&nbspUn Chequeo Antes de Empezar"
    captureBox.style.display = "block"
    instructionsBox.style.display = "none"
    videoCapture()
    const startRecordingButton = document.getElementById("start-recording-button")
    startRecordingButton.addEventListener('click', function captureclicked() {
        boxTitle.innerHTML = "&nbspCapturando Tu Guifo"
        console.log('start recording')
        recorder.startRecording()
        let iconOnButton = document.querySelector(".icon-on-button")
        let iconsvg = document.querySelector('.icon-on-button img')
        iconOnButton.style.background = "#FF6161"
        iconsvg.setAttribute("src", 'static/recording.svg')
        startRecordingButton.style.display = "none"
        const stopRecordingButton = document.getElementById("stop-recording-button")
        stopRecordingButton.style.display = "flex"
        stopRecordingButton.style.background = "#FF6161"
        stopRecordingButton.style.color = "#ffffff"
        stopRecordingButton.addEventListener('click', () => {
            boxTitle.innerHTML = "&nbspVista Previa"
            iconOnButton.style.display = "none"
            stopRecordingButton.style.display = "none"
            console.log('stop recording')
            const uploadGifButton = document.getElementById("upload-gif-button")
            const repeatRecordingButton = document.getElementById("repeat-capture-button")
            repeatRecordingButton.style.display = "flex"
            uploadGifButton.style.display = "flex"
            recorder.stopRecording(() => {
                blobURL = URL.createObjectURL(recorder.getBlob())
            })
            tracks[0].stop()
            video.style.display = "none"
            image.style.display = "block"
            image.setAttribute('src', blobURL)
            repeatRecordingButton.addEventListener('click', () => captureclicked())
            let form = new FormData()
            const datestamp = new Date()
            form.append('file', recorder.getBlob(), `${datestamp.toISOString()}.gif`)
            form.append('api_key', apiKey)
            uploadGifButton.addEventListener('click', () => {
                uploadGif(uploadURL, apiKey, form)
                image.style.display = "none"
                boxTitle.innerHTML = "&nbspSubiendo Guifo"
                repeatRecordingButton.style.display = "none"
                uploadGifButton.style.display = "none"
                let waitingPage = document.querySelector('.waiting-page')
                waitingPage.style.display = "flex"
                setTimeout(() => {
                    boxTitle.innerHTML = "&nbspGuifo Subido Con Éxito"
                    waitingPage.style.display = "none"
                    const successPage = document.getElementById('successful-upload')
                    const successPagePreview = document.querySelector('#successful-upload img')
                    successPagePreview.setAttribute("src", blobURL)
                    successPage.style.display = "flex"
                    captureBox.style.display = "none"
                }, 3000)
            })
        })
    })
})

loadMyGifs()

