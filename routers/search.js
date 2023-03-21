import express from 'express';

const search = express.Router();

import {GetFetchLink, GetData} from '../controllers/products.js';


search.get('/', async (req, res) => {
    const productInfo = await GetData(GetFetchLink(typeof req.query.search_value, req.query.search_value));
    console.log(productInfo.product)
    
// res.send(productInfo.product.codes_tags)
 res.render('pages/single', {
           productInfo
    });
})

// .get('/filter', async (req, res) => {
   
    
// })

export default search;