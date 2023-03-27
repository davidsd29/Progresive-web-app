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

const count = {
    increaseBtn: document.querySelector(".increase"),
    decreaseBtn: document.querySelector(".decrease"),
    addToListBtn: document.querySelector("#add-product-form input[type='submit']"),
    counterIndex: document.getElementById("counter"),
    shoppingListIndex: document.getElementById("shopping-list-index"),
}


export { 
    scan,
    popUp,
    count,
}