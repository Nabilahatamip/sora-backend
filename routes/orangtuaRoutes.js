exports.getRiwayat = (req, res) => {
    const { nis } = req.query;

    db.query(
        `SELECT 
      siswa.nama,
      aktivitas.mapel,
      aktivitas.tipe,
      aktivitas.tanggal,
      aktivitas.waktu
     FROM aktivitas
     JOIN siswa ON aktivitas.siswa_id = siswa.id
     WHERE siswa.nis = ?
     ORDER BY aktivitas.tanggal DESC`,
        [nis],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            res.json(results);
        }
    );
};
const express = require('express');
const router = express.Router();

const orangTuaController = require('../controllers/orangtuaController');

router.get('/anak', orangTuaController.getAnak);
router.get('/riwayat', orangTuaController.getRiwayat);

module.exports = router;