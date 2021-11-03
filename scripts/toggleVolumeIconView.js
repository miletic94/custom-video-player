import { volumeControlerIcons } from "./consts.js";

export const toggleVolumeControlerIcon = () => {
    volumeControlerIcons.forEach(icon => {
        icon.classList.toggle("d-none")
        icon.classList.toggle("d-inline")
    })
}
