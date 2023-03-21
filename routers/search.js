import express from 'express';

const search = express.Router();

import {GetFetchLink, GetData} from '../controllers/products.js';


search.get('/', async (req, res) => {
    console.log(req.query.search_value)
    const productInfo = await GetData(GetFetchLink(typeof req.query.search_value, req.query.search_value));
    console.log(productInfo)
// res.send(productInfo)
 res.render('pages/single', {
            productInfo
    });
})

export default search;