import express from 'express';

const router = express.Router();

import {index, welcome, home, card, groceries}  from '../controllers/controller.js';

router.get('/', index)
    .get('/welcome', welcome)
    .get('/home', home)
    .get('/card', card)
    .get('/groceries', groceries)

export default router;

// module.exports = router;