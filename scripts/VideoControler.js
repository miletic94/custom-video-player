import { videoplayer, enterFullscreenButton, exitFullscreenButton, playButton, pauseButton } from "./consts.js"
import {videoPositionRange, progressValue, volumePositionRange, volumeValue} from "./consts.js"
import {SliderHandler } from "./sliderHanlder.js"

class VideoControler {
    constructor(videoLink, videoplayer) {
        this.videoLink = videoLink
        this.videoplayer = videoplayer
        this.appendVideoElement(this.videoLink, this.videoplayer)
        this.video = this.videoplayer.querySelector('video')
        let i = setInterval(() => {
            this.videoDuration = this.video.duration
            this.videoSliderControler = new SliderHandler(videoPositionRange, progressValue, this.toPercentage(this.video.currentTime, this.videoDuration)) // value = 0.01 because of the bug video.duration = Infinity
            this.volumeSliderControler = new SliderHandler(volumePositionRange, volumeValue, this.toPercentage(this.video.volume, 1)) 
            this.video.addEventListener("timeupdate", () => {
                this.videoSliderControler.value = this.toPercentage(this.video.currentTime, this.videoDuration)
            })
            clearInterval(i)
            }, 200);
        
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
    toPercentage(divisor, divider) {
        return divisor / divider * 100
    }
    isVideoPlaying()  {
        return !!(this.video.currentTime > 0 
                  && !this.video.paused 
                  && !this.video.ended 
                  && this.video.readyState > 2);}
    isVideoEnded(video)  {
        return !!(this.video.currentTime > 0 
                  && this.video.paused 
                  && this.video.ended 
                  && this.video.readyState > 2);}
    // TODO: Try static of SliderHandler; remove if statements
    percentageToValue(percentage, target) {
        if(target === "time") {
            return percentage / 100 * this.videoDuration
        } else if (target === "volume") {
            return percentage / 100 * 1
        } else {
            console.log("You messed something up")
        }
    }
    // Make it more loose and implement try / catch
    updateVideoCurrentTime(inputElement) {
        this.video.currentTime = this.percentageToValue(inputElement.value, "time")
    }
    updateVideoVolume(inputElement) {
        this.video.volume = this.percentageToValue(inputElement.value, "volume")
    }
}


const videoControler = new VideoControler("../videos/video1.webm", videoplayer)

enterFullscreenButton.addEventListener("click",  () => {
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
videoControler.video.addEventListener("click", () => {
    if(!videoControler.isVideoPlaying()) {
        videoControler.play()
        togglePlayPauseView()
    } else if (videoControler.isVideoPlaying()) {
        videoControler.pause()
        togglePlayPauseView()
    }
})

videoControler.video.addEventListener("ended", () => {
   if(videoControler.isVideoEnded()) {
       togglePlayPauseView()
   }
})

videoPositionRange.addEventListener("input", () => {
    videoControler.videoSliderControler.updateValueFromTrackingElement()
    videoControler.updateVideoCurrentTime(videoPositionRange)
})

volumePositionRange.addEventListener("input", () => {
    videoControler.volumeSliderControler.updateValueFromTrackingElement()
    videoControler.updateVideoVolume(volumePositionRange)
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