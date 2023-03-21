import express from 'express';

const router = express.Router();

import {index, welcome, register, login, home, card, groceries}  from '../controllers/controller.js';

router.get('/', index)
    .get('/welcome', welcome)
    .get('/home', home)
    .get('/card', card)
    .get('/groceries', groceries)
    .get('/register', register)
    .get('/login', login)

export default router;

// module.exports = router;