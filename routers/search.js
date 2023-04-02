import express from 'express';

const search = express.Router();

import { ReplanishData } from '../controllers/products.js';
import { shoppingCards } from '../data/data.js';

search
	.get('/', async (req, res) => {
		const productInfo = await ReplanishData(
			req.query.search_value,
			'product'
		);

		res.render('pages/single', {
			productInfo,
		});
	})

	.get('/card', async (req, res) => {
        let imgString = `https://barcodeapi.org/api/${req.query.search_value}`
        shoppingCards.push(req.query.search_value)
        console.log(imgString)
		
		    const pageType = "card";
        res.render("pages/main", {
            pageType,
            saved: true,
            imgString,
        })
	});

export default search;
