let total_carb, total_sugar, total_salt, total_protein;

const products = [];

function CountTotalValues(sugars, salt, protein, carb) {
    total_sugar = total_sugar + sugars;
    total_salt = total_salt + salt;
    total_protein = total_protein + protein;
    total_carb = total_carb + carb;
}

export {
    products,
    total_salt, 
    total_carb, 
    total_sugar, 
    total_protein,
    CountTotalValues
}