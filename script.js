var IMAGEN = ''
var STREAM
const video = document.getElementById('video')
const canvas = document.getElementById('canvas')
const snap = document.getElementById('snap')
const errorMsgElement = document.getElementById('spanErrorMsg')

const constraints = {
    audio: false,
    video: {
        width: 150,
        height: 200
    }
}

async function init() {
    try {
        STREAM = await navigator.mediaDevices.getUserMedia(constraints)
        handleSuccess(STREAM)
    } catch (e) {
        console.log(e)
    }
}

function handleSuccess(stream) {
    window.stream = stream
    video.srcObject = stream
}

init()

snap.addEventListener("click", function() {
    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0, 150, 200)
    console.log(canvas.toDataURL())
})

function stopVideoOnly(stream) {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}
