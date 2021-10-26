const videoPositionRange = document.querySelector('#video-position-range');
const progressValue = document.querySelector('#progress-value');

const volumePositionRange = document.querySelector('#volume-position-range');
const volumeValue = document.querySelector('#volume-value');

videoPositionRange.addEventListener("input", (event) => {
    progressValue.style.width = `${event.target.value}%`
})

volumePositionRange.addEventListener("input", (event) => {
    volumeValue.style.width = `${event.target.value}%`
})