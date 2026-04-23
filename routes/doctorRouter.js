const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

router.post('/add', async (req, res) => {
    try {
        const doctor = new Doctor(req.body);
        await doctor.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

module.exports = router;