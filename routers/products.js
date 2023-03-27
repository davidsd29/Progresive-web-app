import express from 'express';
import {products} from '../data/products.js'
import {GetFetchLink, GetData} from '../controllers/products.js';
const router = express.Router();

router.post('/add/:barcode', (req, res) => {
 
    const obj = { 
        productCode: req.params.barcode,
        productAmount: req.body.product_amount 
    };

    products.push(obj)

    // console.log(products)
    setTimeout(() => {
        res.redirect('/home');
    }, 2000);
})


.get('/:id/', async (req, res) => {
    
    const productInfo = await GetData(GetFetchLink(typeof req.params.id, req.params.id));
    console.log(productInfo)
    res.render('pages/single', {
        productInfo
    });
})
  

export default router;
