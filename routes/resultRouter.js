const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const TestType = require('../models/TestType');

router.post('/add', async (req, res) => {
    const { patientId, doctorId, testTypeId, value } = req.body;
    const test = await TestType.findById(testTypeId);
    const val = parseFloat(value);
    
    let status = "Natural";
    if (val < test.minValue) status = "Low";
    else if (val > test.maxValue) status = "High";

    await new Result({ patientId, doctorId, testTypeId, value: val, status }).save();
    res.redirect('/results');
});
module.exports = router;