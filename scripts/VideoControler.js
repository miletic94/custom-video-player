const videoplayer = document.querySelector('#video-frame')

class VideoControler {
    constructor(videoLink, videoplayer) {
        this.videoLink = videoLink
        this.videoplayer = videoplayer
        this.appendVideoElement(this.videoLink, this.videoplayer)
    }
    appendVideoElement(videoLink, videoplayer) {
        let videoElement = document.createElement("video")
        videoElement.setAttribute("src", videoLink)
        videoElement.setAttribute("controls", true)
        videoplayer.appendChild(videoElement)
    }

}


const videoControler = new VideoControler("../videos/video1.webm", videoplayer)
