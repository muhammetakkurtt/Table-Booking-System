const mysql = require('mysql2');

let db;

function handleDisconnect() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 3306 
  });

  db.connect(err => {
    if (err) {
      console.error('MySQL connection error:', err);
      setTimeout(handleDisconnect, 2000);
        11;rgb:0000/0000/0000} else {
      console.log(`MySQL Connected on port ${db.config.port}...`);
    }
  });

  db.on('error', err => {
    console.error('MySQL connection error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

setInterval(() => {
  db.query('SELECT 1', (err) => {
    if (err) {
      console.error('Keep-Alive query error:', err);
    }
  });
}, 30000); 

module.exports = db;