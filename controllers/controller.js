import {
	products,
	shoppingCards,
	total_carb,
	total_sugar,
	total_salt,
	total_protein,
} from '../data/data.js';
import { ReplanishData } from './products.js';

const index = (req, res) => {
	res.render('pages/index');
};

const welcome = (req, res) => {
	res.render('partials/popup/start');
};

const offline = (req, res) => {
	res.render('pages/offline');
};

const home = (req, res) => {
	const pageType = 'home';
	res.render('pages/main', {
		pageType,
	});
};

const card = (req, res) => {
    let imgString = `https://barcodeapi.org/api/${req.query.search_value}`

	const pageType = 'card';
	res.render('pages/main', {
		saved : false,
		pageType,
		imgString,
	});
};

const groceries = async (req, res) => {
	console.log(req.query);
	const pageType = 'list';
	let total_value = 0;
	let total_name;

	const fetchArrays = products.map((item) => {
		return ReplanishData(item, 'listItem');
	});

	switch (req.query.filter) {
		case 'sugar':
			total_name = 'sugar';
			total_value = total_sugar;
			break;

		case 'salt':
			total_name = 'salt';
			total_value = total_salt;

			break;

		case 'protein':
			total_name = 'protein';
			total_value = total_protein;

			break;

		case 'carb':
			total_name = 'carbohydrates';
			total_value = total_carb;

			break;

		default:
			total_name = 'products';
			console.log('No filter found');
	}

	Promise.all(fetchArrays).then((shoppingList) => {
		console.log(shoppingList);
		if (req.query !== {}) total_value = shoppingList.length;
		// 	DataIsLoading(false);

		res.render('pages/main', {
			pageType,
			total_name,
			total_value,
			shoppingList,
		});
	});
};

export { home, card, index, offline, welcome, groceries };
