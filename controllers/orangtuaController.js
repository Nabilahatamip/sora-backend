const db = require('../config/db');

// DATA ANAK
exports.getAnak = (req, res) => {
    const { nis } = req.query;

    db.query(
        'SELECT * FROM siswa WHERE nis = ?',
        [nis],
        (err, results) => {
            if (err) return res.status(500).json({ message: 'Server error' });

            if (results.length === 0) {
                return res.status(404).json({ message: 'Siswa tidak ditemukan' });
            }

            res.json(results[0]);
        }
    );
};

// RIWAYAT
exports.getRiwayat = (req, res) => {
    const { nis } = req.query;

    db.query(
        `SELECT 
      siswa.nama,
      siswa.kelas,
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