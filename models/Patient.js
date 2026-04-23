const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    gender: { type: String, enum: ['male', 'female'] },
    phone: String,
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Patient', patientSchema);