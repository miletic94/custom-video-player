const playPauseButton = document.querySelector('#play-button');

const togglePlayPauseView = () => {
    [...playPauseButton.children].forEach(child => {
        child.classList.toggle("d-none")
        child.classList.toggle("d-inline")
    })
}

playPauseButton.addEventListener("click", () => {
    togglePlayPauseView()
})