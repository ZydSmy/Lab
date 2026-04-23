const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// استدعاء الموديلات للعرض
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const TestType = require('./models/TestType');
const Result = require('./models/Result');

// الإعدادات العامة
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// الاتصال بقاعدة البيانات
mongoose.connect('mongodb://127.0.0.1:27017/bloodLabDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// --- عرض الصفحات (GUI Routes) ---

app.get('/patients', async (req, res) => {
    const patients = await Patient.find().sort({ _id: -1 });
    res.render('patients', { patients });
});

app.get('/doctors', async (req, res) => {
    const doctors = await Doctor.find();
    res.render('doctors', { doctors });
});

app.get('/test-types', async (req, res) => {
    const tests = await TestType.find();
    res.render('test-types', { tests });
});

app.get('/results', async (req, res) => {
    const { search } = req.query;
    let query = {};
    if (search) {
        const pList = await Patient.find({ name: { $regex: search, $options: 'i' } });
        query = { patientId: { $in: pList.map(p => p._id) } };
    }
    const history = await Result.find(query).populate('patientId doctorId testTypeId').sort({ createdAt: -1 });
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    const tests = await TestType.find();
    res.render('results', { history, patients, doctors, tests, searchTerm: search || '' });
});

// مسار عرض تاريخ تحاليل مريض محدد
app.get('/patients/:id/history', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        const results = await Result.find({ patientId: req.params.id })
            .populate('testTypeId doctorId')
            .sort({ createdAt: -1 });

        res.render('patient-history', { patient, results });
    } catch (err) {
        res.status(404).send("Patient not found");
    }
});

app.get('/', (req, res) => res.redirect('/results'));

// --- ربط الروابط التشغيلية ---
app.use('/patients', require('./routes/patientRouter'));
app.use('/doctors', require('./routes/doctorRouter'));
app.use('/test-types', require('./routes/testTypeRouter'));
app.use('/results', require('./routes/resultRouter'));

app.listen(3000, () => console.log("Server: http://localhost:3000"));