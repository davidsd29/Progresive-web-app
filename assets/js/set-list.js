import { count} from './variables.js';
const completePopUp = document.getElementById("complete-pop-up");
const completePopUTpext = document.querySelector("#complete-pop-up p");
let shoppingCartAmount = 0;
let counter = 0;

if (count.counterIndex !== null) count.counterIndex.value = counter;

function SetProduct(barcode) {
    const groceriesList = JSON.parse(localStorage.getItem("groceries") || "[]");

    const product = { 
        productCode: barcode,
        productAmount: counter 
    };
    console.log(product)

    
    if (counter !== 0) {
        CheckShoppingList(counter);
        groceriesList.push(product);
        
        count.counterIndex.textContent = counter;  
        counter = 0;
        StoreGroceriesList(groceriesList);

    } else {
        count.counterIndex.classList.add("required");
        console.log("Please give an amount");
    }
}

function ChangeCounterValue(value) {
    counter = counter + value;
    if (counter < 0) counter = 0;
    console.log(counter)
    count.counterIndex.value = counter;
}

function CheckShoppingList(productAmount) {
    shoppingCartAmount = shoppingCartAmount + productAmount;

    if ( shoppingCartAmount != 0){
        count.shoppingListIndex.style.display = "block";
        count.shoppingListIndex.textContent = shoppingCartAmount;
    }
}


function StoreGroceriesList(groceriesList) {
    localStorage.setItem("groceries", JSON.stringify(groceriesList));
    console.log(groceriesList)

    DisplayTaskCompletePopUp("Product is saved successfully");
}


function DisplayTaskCompletePopUp(message) {
    completePopUp.classList.add("open");
    completePopUTpext.textContent = message;
    setTimeout(function() {completePopUp.classList.remove("open");}, 2000);
}


export { SetProduct, ChangeCounterValue }