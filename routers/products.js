import express from 'express';

const router = express.Router();

import {GetFetchLink, GetData} from '../controllers/products.js';

// router.get('/', product)
    router.get('/:id/', async (req, res) => {
        
        const productInfo = await GetData(GetFetchLink(typeof req.params.id, req.params.id));
        console.log(productInfo)
        res.render('pages/single', {
            productInfo
    });

    // res.send(productInfo)
})
    

export default router;
