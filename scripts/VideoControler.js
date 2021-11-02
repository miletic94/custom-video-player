import { videoplayer, enterFullscreenButton, exitFullscreenButton, playButton, pauseButton } from "./consts.js"
import {videoPositionRange, progressValue, volumePositionRange, volumeValue} from "./consts.js"
import {SliderHandler } from "./sliderHanlder.js"

class VideoControler {
    constructor(videoLink, videoplayer) {
        this.videoLink = videoLink
        this.videoplayer = videoplayer
        this.appendVideoElement(this.videoLink, this.videoplayer)
        this.video = this.videoplayer.querySelector('video')
        this.videoSliderControler = new SliderHandler(videoPositionRange, progressValue, this.video.currentTime) // value = 0.01 because of the bug video.duration = Infinity
        this.volumeSliderControler = new SliderHandler(volumePositionRange, volumeValue, this.video.volume) 
    }
    appendVideoElement(videoLink, videoplayer) {
        let videoElement = document.createElement("video")
        videoElement.setAttribute("src", videoLink)
        videoplayer.appendChild(videoElement)
    }
    play() {
        this.video.play()
    }
    pause() {
        this.video.pause()
    }
    enterFullscreen() {
        this.videoplayer.requestFullscreen()
    }
    exitFullscreen() {
        document.exitFullscreen()
    }
    
}


const videoControler = new VideoControler("../videos/video1.webm", videoplayer)
console.log(videoControler.video.volume)
enterFullscreenButton.addEventListener("click", () => {
    videoControler.enterFullscreen()
})
exitFullscreenButton.addEventListener("click", () => {
    videoControler.exitFullscreen()
})

playButton.addEventListener("click", () => {
    videoControler.play()
})
pauseButton.addEventListener("click", () => {
    videoControler.pause()
})

videoPositionRange.addEventListener("input", () => {
    console.log("object")
    videoControler.videoSliderControler.updateValueFromTrackingElement()
})

volumePositionRange.addEventListener("input", () => {
    videoControler.volumeSliderControler.updateValueFromTrackingElement()
})










/*  Debug video.duration = Infinity   */
var vid = document.querySelector("video");
vid.addEventListener('loadedmetadata', function () {
    if (vid.duration == Infinity) {
        vid.currentTime = 1e101;
        vid.ontimeupdate = function () {
            this.ontimeupdate = () => {
               return
            }
            vid.currentTime = 0.001;
            return;
        }
    }
});
function getVideoDuration() {
   console.log(vid.duration)
   console.log(vid.currentTime)
}