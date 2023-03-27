import express from 'express';

const search = express.Router();

import {ReplanishData} from '../controllers/products.js';


search.get('/', async (req, res) => {
    const productInfo = await ReplanishData( req.query.search_value, 'product');
    console.log(productInfo)
    
// res.send(productInfo.product.codes_tags)
 res.render('pages/single', {
           productInfo
    });
})

// .get('/filter', async (req, res) => {
   
    
// })

export default search;