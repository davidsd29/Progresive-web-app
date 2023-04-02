const popUp = {
    error: document.getElementById("error-pop-up"),
    scan: document.getElementById("scan-pop-up"),
    start: document.getElementById("start-pop-up"),
    loading: document.getElementById("loading-pop-up"),
    registration: document.getElementById("registration-pop-up"),
    closeBtn: document.querySelectorAll(".close")
}

const shoppingCard = {
  frame: document.getElementById("shopping-card"),
  notNowBtn: document.querySelector("#shopping-card section:first-of-type button"),
  invite: document.querySelector("#shopping-card section:first-of-type"),
  card: document.querySelector("#shopping-card section:nth-of-type(2)"),
  saveSection: document.querySelector("#shopping-card section:nth-of-type(3)"),
  saveBtn: document.querySelector("#shopping-card section:nth-of-type(3) button:first-of-type"),
  saveLaterBtn: document.querySelector("#shopping-card section:nth-of-type(3) button:last-of-type"),
  deleteSection: document.querySelector("#shopping-card section:last-of-type"),
  deleteBtn: document.querySelector("#shopping-card section:last-of-type button")
} 

const scan = {
    start: document.getElementById("start-camera-scan"),
    stop: document.getElementById("stop-camera-scan"),
    toggle: document.getElementById("scan-toggle"),
    // card_popup: document.getElementById("scan-toggle")
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
    shoppingCard
}