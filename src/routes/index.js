const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render("pages/home")
});

router.get('/animal/:id', (req, res) => {
    res.render("pages/animal")
});

module.exports = router;