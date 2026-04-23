const express = require('express');
const router = express.Router();
const TestType = require('../models/TestType');

router.post('/add', async (req, res) => {
    try {
        const test = new TestType(req.body);
        await test.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;