const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sora_backend',
    waitForConnections: true,
    connectionLimit: 10,
    // CATATAN: dateStrings + timezone custom sempat dicoba di sini untuk
    // fix masalah timezone, TAPI ternyata menyebabkan kolom tanggal/waktu
    // jadi NULL saat dipakai bareng CURDATE()/CURTIME() di query INSERT.
    // Dikembalikan ke default. Fix timezone yang benar sekarang dilakukan
    // di level kode JavaScript (controller), bukan di level driver MySQL.
});

db.getConnection()
  .then(conn => {
    console.log('MySQL Connected');
    conn.release();
  })
  .catch(err => {
    console.log('MySQL Error:', err.message);
  });

module.exports = db;