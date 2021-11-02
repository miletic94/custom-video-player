import {playbackRateOptions, currentPlaybackRate } from "./consts.js";


playbackRateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.dataset.playbackRate === "1.0") {
            currentPlaybackRate.innerText = "Normal"
            return
        }
        currentPlaybackRate.innerText = `${option.dataset.playbackRate}x`
    })
})