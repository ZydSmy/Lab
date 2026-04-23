const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const TestType = require('./models/TestType');
const Result = require('./models/Result');

mongoose.connect('mongodb://127.0.0.1:27017/bloodLabDB');

async function seed() {
    // 1. مسح البيانات القديمة
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await TestType.deleteMany({});
    await Result.deleteMany({});

    // 2. إضافة أنواع التحاليل
    const hb = await TestType.create({ testName: 'HEMOGLOBIN', minValue: 13.5, maxValue: 17.5, unit: 'g/dL' });
    const glu = await TestType.create({ testName: 'GLUCOSE', minValue: 70, maxValue: 100, unit: 'mg/dL' });

    // 3. إضافة دكتور ومريض
    const doc = await Doctor.create({ name: 'Dr. Mostafa', specialization: 'Internal Medicine' });
    const pat1 = await Patient.create({ name: 'Ahmed Khalid', age: 45, gender: 'male', phone: '0100000000' });
    const pat2 = await Patient.create({ name: 'Mona Zaki', age: 29, gender: 'female', phone: '0120000000' });

    // 4. إضافة نتائج (منطقية)
    await Result.create([
        { patientId: pat1._id, doctorId: doc._id, testTypeId: hb._id, value: 10, status: 'Low' },
        { patientId: pat1._id, doctorId: doc._id, testTypeId: glu._id, value: 85, status: 'Natural' },
        { patientId: pat2._id, doctorId: doc._id, testTypeId: hb._id, value: 14, status: 'Natural' },
        { patientId: pat2._id, doctorId: doc._id, testTypeId: glu._id, value: 150, status: 'High' }
    ]);

    console.log("Database Seeded Successfully! ✅");
    process.exit();
}

seed();