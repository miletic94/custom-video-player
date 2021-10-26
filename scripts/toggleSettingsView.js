const settingsButton = document.querySelector("#settings-button")
const settingsPannel = document.querySelector("#settings-pannel")
const speedPannelButtons = [...document.querySelectorAll("[data-toggle-settings = 'speed-pannel']")]
const qualityPannelButtons = [...document.querySelectorAll("[data-toggle-settings = 'quality-pannel']")]
const speedPannel = document.querySelector('#speed-pannel');
const qualityPannel = document.querySelector('#quality-pannel');

/* TODO: When clicked off of element - element should disappear */

const toggleSettings = (target) => {
    if(window.getComputedStyle(target).display === "none") {
        target.style.display = "flex"
    } else {
        target.style.display = "none"
    }
}

settingsButton.addEventListener("click", () => {
    toggleSettings(settingsPannel)
})

speedPannelButtons.forEach(button => {
    button.addEventListener("click", () => {
        toggleSettings(settingsPannel)
        toggleSettings(speedPannel)
    })
})

qualityPannelButtons.forEach(button => {
    button.addEventListener("click", () => {
        toggleSettings(settingsPannel)
        toggleSettings(qualityPannel)
    })
})