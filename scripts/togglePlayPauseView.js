const playButton = document.querySelector('#play-button');

const togglePlayPauseView = () => {
    [...playButton.children].forEach(child => {
        child.classList.toggle("d-none")
        child.classList.toggle("d-inline")
    })
}

playButton.addEventListener("click", () => {
    togglePlayPauseView()
})