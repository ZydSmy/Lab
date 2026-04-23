const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    specialization: {
        type: String,
        default: 'General Physician' // قيمة افتراضية في حال لم يتم الإدخال
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);