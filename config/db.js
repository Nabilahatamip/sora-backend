const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sora_Backend'
})

// Test koneksi
db.getConnection()
  .then(conn => {
    console.log('MySQL Connected')
    conn.release()
  })
  .catch(err => {
    console.log('MySQL Error:', err.message)
  })

module.exports = db