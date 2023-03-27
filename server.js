import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

// Routes
import main from './routers/pages.js';
import products from './routers/products.js';
import search from './routers/search.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');

//Middelware (Has to happen before routing)
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.urlencoded({extended: false}));


app.use('/', main);
app.use('/product', products);
app.use('/serach', search);


app.use((req, res) => {
	res.status(404).render('404');
});


// Callback function
app.listen(process.env.PORT, () => {
	console.log(`code is running in port:${process.env.PORT}`);
});
