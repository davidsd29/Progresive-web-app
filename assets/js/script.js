import { popUp, scan} from './variables.js';
import {StartCameraScan } from './barcode-handler.js';


// scan.stop.addEventListener("click", StopCameraScan);
scan.start.addEventListener("click", () => {
console.log("appel")

    StartCameraScan("product");
    popUp.scan.classList.remove("open")
}); 

console.log(scan)

scan.popup.addEventListener("click", () => {
    console.log("hai")
    popUp.scan.classList.add("open")
}); 
