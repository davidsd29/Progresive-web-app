import { popUp, scan, count} from './variables.js';
import { ChangeCounterValue, SetProduct } from './set-list.js';
import {StartCameraScan } from './barcode-handler.js';


scan.start.addEventListener("click", () => {

    StartCameraScan("product");
    popUp.scan.classList.remove("open")
}); 


scan.popup.addEventListener("click", () => {
    console.log("hai")
    popUp.scan.classList.add("open")
}); 

count.increaseBtn.addEventListener("click", () => {
    if (count.counterIndex.classList.contains("required")) count.counterIndex.classList.remove("required");
    ChangeCounterValue(1);
});

count.decreaseBtn.addEventListener("click", () => {
    ChangeCounterValue(-1);
});

count.addToListBtn.addEventListener("click", (e) => {
    SetProduct(Number(e.target.getAttribute('data-barcode')))
});