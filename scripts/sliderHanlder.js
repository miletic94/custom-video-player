// import {videoPositionRange, volumePositionRange} from "./consts.js"
// import {progressValue, volumeValue} from "./consts.js"

// Imena za varijable: valueControlElement, valueDisplayElement, value

export class SliderHandler {
    #value
    #trackingElement
    #progressElement
    constructor(trackingElement, progressElement, value) {
        this.#trackingElement = trackingElement
        this.#progressElement = progressElement
        this.value = value // invoces setter function
        this.video= "hi"
    }
    get value() {
        return this.#value
    }
    get trackingElement() {
        return this.#trackingElement
    }
    get trackingElementValue() {
        return this.#trackingElement.value
    }
    set value(value) {
        this.#value = value
        this.#trackingElement.value = value
        this.#progressElement.style.width = `${value}%`
    }
    updateValueFromTrackingElement() {
        this.value = this.#trackingElement.value
    }
}

// export class VideoSliderHandler extends SliderHandler {
//     constructor(trackingElement, progressElement, value) {
//         super(trackingElement, progressElement, value)
//         this.name = "video position controler"
//         console.log(`${this.name}: ${this.value}`)
       
//     }
//     transformValueToPercentage(value) {
//         console.log(this.video)
//     }
// }
// export class VolumeSliderHandler extends SliderHandler {
//     constructor(trackingElement, progressElement, value) {
//         super(trackingElement, progressElement, value)
//         this.name= "volume controler"
//         console.log(`${this.name}: ${this.value}`)
//     }
//     transformValueToPercentage(value) {
//         return value / 1 * 100
//     }
// }
// const videoPositionHandler = new SliderHandler(videoPositionRange, progressValue, 0)
// videoPositionRange.addEventListener("input", () => {
//     videoPositionHandler.updateValueFromTrackingElement()
// })

// const volumePositionHandler = new SliderHandler(volumePositionRange, volumeValue, 100)
// volumePositionRange.addEventListener("input", () => {
//     volumePositionHandler.updateValueFromTrackingElement()
// })

