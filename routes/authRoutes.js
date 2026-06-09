const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const db = require('../config/db'); // sesuaikan path, biasanya naik satu folder

// --- Route yang sudah ada ---
router.post('/update-password', authController.updatePassword);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// --- ENDPOINT 1: Ketika QR di-scan ---
router.post('/scan', async (req, res) => {
  const { ip_address } = req.body;

  const [rows] = await db.query(
    `SELECT d.*, s.nama, s.nis 
     FROM devices d
     LEFT JOIN students s ON s.device_id = d.id
     WHERE d.ip_address = ?`,
    [ip_address]
  );

  if (rows.length === 0) {
    return res.json({ status: 'not_found', ip_address });
  }

  const device = rows[0];

  if (device.is_registered && device.nama) {
    return res.json({
      status: 'registered',
      data: { ip_address: device.ip_address, nama: device.nama, nis: device.nis }
    });
  } else {
    return res.json({ status: 'unregistered', ip_address });
  }
});

// --- ENDPOINT 2: Ketika form data siswa dikirim ---
router.post('/register-device', async (req, res) => {
  const { ip_address, nama, nis } = req.body;

  await db.query(
    `INSERT INTO devices (ip_address, is_registered) VALUES (?, 1)
     ON DUPLICATE KEY UPDATE is_registered = 1`,
    [ip_address]
  );

  const [device] = await db.query(
    'SELECT id FROM devices WHERE ip_address = ?',
    [ip_address]
  );

  await db.query(
    `INSERT INTO students (device_id, nama, nis) VALUES (?, ?, ?)`,
    [device[0].id, nama, nis]
  );

  res.json({ status: 'success', message: 'Data siswa berhasil disimpan' });
});

module.exports = router; // module.exports selalu paling bawah sendiri