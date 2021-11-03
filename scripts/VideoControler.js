import { videoplayer, enterFullscreenButton, exitFullscreenButton, playButton, pauseButton } from "./consts.js"
import {videoPositionRange, progressValue, volumePositionRange, volumeValue} from "./consts.js"
import {SliderHandler } from "./sliderHanlder.js"
import { playbackRateOptions } from "./consts.js"
import {videoDurationDisplayElements, videoCurrentTimeDisplayElements} from "./consts.js"
import {toggleVolumeControlerIcon} from "./toggleVolumeIconView.js"
import {volumeControlerIcons} from "./consts.js"

class VideoControler {
    constructor(videoLink, videoplayer) {
        this.videoLink = videoLink
        this.videoplayer = videoplayer
        this.appendVideoElement(this.videoLink, this.videoplayer)
        this.video = this.videoplayer.querySelector('video')
        let i = setInterval(() => {
            this.videoDuration = this.video.duration
            this.videDurationArranged = this.toHoursMinutesSeconds(this.video.duration)
            this.videoSliderControler = new SliderHandler(videoPositionRange, progressValue, this.toPercentage(this.video.currentTime, this.videoDuration)) // value = 0.01 because of the bug video.duration = Infinity
            this.volumeSliderControler = new SliderHandler(volumePositionRange, volumeValue, this.toPercentage(this.video.volume, 1)) 
            
            this.video.addEventListener("timeupdate", () => {
                this.videoSliderControler.value = this.toPercentage(this.video.currentTime, this.videoDuration)
                let currentTime = this.toHoursMinutesSeconds(this.video.currentTime)
                // SKUPO
                videoCurrentTimeDisplayElements.forEach(element => {
                    if(element.dataset.currentTime === "hours"
                  && this.videDurationArranged[element.dataset.currentTime] === 0) {
                    return  
                } else if(currentTime[element.dataset.currentTime] === NaN) {
                    element.innerText = "00"
                }
                element.innerText = ("0"+currentTime[element.dataset.currentTime]).slice(-2)
                })
            })
            
            videoDurationDisplayElements.forEach(element => {
                if(element.dataset.duration === "hours"
                  && this.videDurationArranged[element.dataset.duration] === 0) {
                    return  
                } else if(this.videDurationArranged[element.dataset.currentTime] === NaN) {
                    console.log(("nan"))
                    element.innerText = "00"
                }
                element.innerText = ("0"+this.videDurationArranged[element.dataset.duration]).slice(-2)
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
        console.log(this.percentageToValue(inputElement.value, "volume"))
        if(this.percentageToValue(inputElement.value, "volume") === 0) {
            this.video.muted = true
            toggleVolumeControlerIcon()
            return
        }
        this.video.volume = this.percentageToValue(inputElement.value, "volume")
        if(this.video.muted) {
            this.video.muted = false
            toggleVolumeControlerIcon()
        }
        
    }
    mute() {
        this.volumeSliderControler.value = 0 // THIS IS BAD
        this.video.muted = true
    }
    // put volume value in session sotrage
    unmute() {
        this.volumeSliderControler.value = 100 // THIS IS BAD
        this.video.muted = false
    }
    get playbackRate() {
        return this.video.playbackRate
    }
    set playbackRate(value) {
        if(value <=2  && value >= 0.5) {
            this.video.playbackRate = value
            return 
        } 
        console.log("You messed something up")
    }
    toHoursMinutesSeconds(time) { // for time in seconds
        return {
            hours: Math.floor(time / 3600),
            minutes: Math.floor(time%3600/60),
            seconds: Math.floor(time%3600%60)
        }
    }
}


const videoControler = new VideoControler("../videos/video1.webm", videoplayer)

console.log(videoControler.playbackRate)
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
videoControler.video.addEventListener("dblclick", () => {
    if(!!document.fullscreenElement) {
        document.exitFullscreen()
        return
    }
    videoControler.videoplayer.requestFullscreen()
})

videoPositionRange.addEventListener("input", () => {
    videoControler.videoSliderControler.updateValueFromTrackingElement()
    videoControler.updateVideoCurrentTime(videoPositionRange)
})

volumePositionRange.addEventListener("input", () => {
    videoControler.volumeSliderControler.updateValueFromTrackingElement()
    videoControler.updateVideoVolume(volumePositionRange)
})

playbackRateOptions.forEach(option => {
    option.addEventListener("click", () => {
        videoControler.playbackRate = option.dataset.playbackRate
    })
})

volumeControlerIcons.forEach(icon => {
    icon.addEventListener("click", (event) => {
        if(icon.dataset.volumeControlerIcon === "mute") {
            videoControler.mute()
        } else if(icon.dataset.volumeControlerIcon === "unmute") {
            videoControler.unmute()
        }
        toggleVolumeControlerIcon()
    })
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