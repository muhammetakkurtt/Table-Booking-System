const db = require('../config/config');

exports.createReservation = (user_id, table_id, reservation_date, callback) => {
  db.query('INSERT INTO reservations (user_id, table_id, reservation_date) VALUES (?, ?, ?)', [user_id, table_id, reservation_date], callback);
};

exports.getReservationsByUser = (user_id, callback) => {
  db.query('SELECT * FROM reservations WHERE user_id = ?', [user_id], callback);
};

exports.getAllReservations = (callback) => {
  db.query('SELECT * FROM reservations', callback);
};

exports.updateReservationStatus = (reservation_id, status, callback) => {
  db.query('UPDATE reservations SET status = ? WHERE id = ?', [status, reservation_id], callback);
};
