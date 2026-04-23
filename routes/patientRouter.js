const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

router.post('/add', async (req, res) => {
    await new Patient(req.body).save();
    res.redirect('/patients');
});
module.exports = router;