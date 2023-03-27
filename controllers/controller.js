import {products} from '../data/products.js'

const index =  (req, res) => {
    res.render("pages/index")
}

const welcome =  (req, res) => {
    res.render("partials/popup/start")
}

const register =  (req, res) => {
    res.render("pages/register")
}

const login =  (req, res) => {
    res.render("pages/login")
}

const home =  (req, res) => {
    const pageType = "home";
    res.render("pages/main", {
       pageType
    })
}

const card =  (req, res) => {
    const pageType = "card";

    res.render("pages/main", {
       pageType
    })
}

const groceries =  (req, res) => {
    console.log(req.query)
    const pageType = "list";
    console.log(products);
    res.render("pages/main", {
       pageType,
       products
    })
}
export {
    home,
    card,
    index,
    login,
    welcome,
    register,
    groceries,
}