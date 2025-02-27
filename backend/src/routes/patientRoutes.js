const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

// 患者登録API
router.post('/', patientController.registerPatient);

// 患者情報更新API
router.put('/:id', patientController.updatePatient);

// 患者情報取得API
router.get('/all', patientController.getAllPatients);

// 特定の患者情報の取得API
router.get('/:id', patientController.updatePatient);

module.exports = router;