import express from 'express';
import { products, CountTotalValues } from '../data/products.js'
import { ReplanishData } from '../controllers/products.js';
const router = express.Router();

router.post('/add/:barcode', async (req, res) => {
 
    const productInfo = await ReplanishData(( req.params.id, 'product'));
    console.log(productInfo)
    // CountTotalValues(
    //     productInfo.product.nutriments.sugars, 
    //     productInfo.product.nutriments.salt,
    //     productInfo.product.nutriments.proteins,
    //     productInfo.product.nutriments.carbohydrates
    // )
    
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
    
    const productInfo = await ReplanishData(( req.params.id, 'product'));
    res.render('pages/single', {
        productInfo
    });
})
  

export default router;
