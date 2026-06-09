const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

// GURU
router.get('/guru', adminController.getAllGuru);
router.post('/guru', adminController.tambahGuru);
router.put('/guru/:id', adminController.editGuru);
router.delete('/guru/:id', adminController.hapusGuru);

// ORANG TUA
router.get('/orangtua', adminController.getAllOrangTua);
router.post('/orangtua', adminController.tambahOrangTua);
router.put('/orangtua/:id', adminController.editOrangTua);
router.delete('/orangtua/:id', adminController.hapusOrangTua);

// ADMIN
router.put('/admin/:id', adminController.editAdmin);

// LAPORAN
router.get('/laporan', adminController.getLaporan);

// SISWA
router.post('/siswa', adminController.tambahSiswa);

// DEVICES
router.post('/device/register', adminController.registerDevice);
router.post('/device/tambah-siswa', adminController.tambahSiswaDevice);

module.exports = router;