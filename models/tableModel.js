const db = require('../config/config');

exports.createTable = (table_number, seats, callback) => {
  db.query('INSERT INTO tables (table_number, seats) VALUES (?, ?)', [table_number, seats], callback);
};

exports.getAllTables = (callback) => {
  db.query('SELECT * FROM tables', callback);
};
