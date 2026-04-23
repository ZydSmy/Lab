const mongoose = require('mongoose');

const testTypeSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true,
        unique: true, // يمنع تكرار نفس اسم التحليل في القاعدة
        uppercase: true // يحول الاسم تلقائياً لحروف كبيرة
    },
    minValue: {
        type: Number,
        required: true
    },
    maxValue: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true // الوحدة مثل mg/dL
    }
});

module.exports = mongoose.model('TestType', testTypeSchema);