import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("pages/login")
})

export default router;
// module.exports = router;