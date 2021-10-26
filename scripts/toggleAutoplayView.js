const toggleAutoplayButton = document.querySelector('[data-autoplay]');

const toggleAutoplay = () => {
    toggleAutoplayButton.classList.toggle("autoplay-true")
    toggleAutoplayButton.querySelector(".pellet").classList.toggle("autoplay-true")
}

toggleAutoplayButton.addEventListener("click", () => {
    toggleAutoplay()
})
