const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient', // ربط بجدول المرضى
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // ربط بجدول الدكاترة
        required: true
    },
    testTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestType', // ربط بنوع التحليل
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Natural', 'High', 'Low'], // الحالات المسموحة فقط
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // تاريخ تلقائي عند الإضافة
    }
});

module.exports = mongoose.model('Result', resultSchema);