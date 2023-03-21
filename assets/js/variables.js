const popUp = {
    error: document.getElementById("error-pop-up"),
    scan: document.getElementById("scan-pop-up"),
    start: document.getElementById("start-pop-up"),
    loading: document.getElementById("loading-pop-up"),
    registration: document.getElementById("registration-pop-up"),
    closeBtn: document.querySelectorAll(".close")
}

const scan = {
    start: document.getElementById("start-camera-scan"),
    stop: document.getElementById("stop-camera-scan"),
    popup: document.getElementById("scan-toggle")
} 


export { 
    scan,
    popUp 
}