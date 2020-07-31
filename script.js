// const adminSocket = io('http://aplicaciones.coopsana.com.co:8674/', { transports: ['websocket'] })

// adminSocket.on('servidor', (data) => {
//     $("#contenedor_textos").append(`<li><b>Texto:</b> ${data.texto}</li>`)
// })

// function enviar() {
//     let texto = document.getElementById('texto')
//     console.log(texto.value)
//     adminSocket.emit('mensaje', {
//         'mensaje': 'saludo desde un servidor externo',
//         'texto': texto.value
//     })
// }

// 'use strict'

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
    stopVideoOnly(window.stream)
    setTimeout(() => {
        init()
    }, 1000);
})

function stopVideoOnly(stream) {
    stream.getTracks().forEach(function(track) {
        if (track.readyState == 'live' && track.kind === 'video') {
            track.stop();
        }
    });
}