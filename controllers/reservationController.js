const db = require('../config/config');

exports.makeReservation = (req, res) => {
  const { table_id, reservation_date } = req.body;
  const user_id = req.userId;

  const selectedDate = new Date(reservation_date);
  const currentDate = new Date();

  if (selectedDate < currentDate) {
      return res.status(400).send('Cannot make a reservation for a past date');
  }

  db.query('SELECT * FROM reservations WHERE user_id = ?', [user_id], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          return res.status(400).send('You already have a reservation');
      }

      db.query('SELECT * FROM tables WHERE id = ? AND status = "available"', [table_id], (err, results) => {
          if (err) throw err;

          if (results.length === 0) {
              return res.status(400).send('Table is not available');
          }

          db.query('INSERT INTO reservations (user_id, table_id, reservation_date) VALUES (?, ?, ?)', [user_id, table_id, reservation_date], (err, result) => {
              if (err) throw err;

              db.query('UPDATE tables SET status = "occupied" WHERE id = ?', [table_id], (err, result) => {
                  if (err) throw err;
                  res.status(201).send('Reservation made successfully');
              });
          });
      });
  });
};


exports.getUserReservations = (req, res) => {
  const user_id = req.userId;

  db.query('SELECT * FROM reservations WHERE user_id = ?', [user_id], (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};

exports.getAllReservations = (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send('Access denied');
  }

  db.query('SELECT * FROM reservations', (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};

exports.updateReservationStatus = (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send('Access denied');
  }

  const { status } = req.body;
  const reservation_id = req.params.id;

  db.query('UPDATE reservations SET status = ? WHERE id = ?', [status, reservation_id], (err, result) => {
    if (err) throw err;
    res.status(200).send('Reservation status updated');
  });
};

exports.cancelReservation = (req, res) => {
  const user_id = req.userId;

  db.query('SELECT * FROM reservations WHERE user_id = ?', [user_id], (err, results) => {
    if (err) throw err;

    if (results.length === 0) {
      return res.status(400).send('No reservation found');
    }

    const reservation_id = results[0].id;
    const table_id = results[0].table_id;

    db.query('DELETE FROM reservations WHERE id = ?', [reservation_id], (err, result) => {
      if (err) throw err;

      db.query('UPDATE tables SET status = "available" WHERE id = ?', [table_id], (err, result) => {
        if (err) throw err;
        res.status(200).send('Reservation cancelled successfully');
      });
    });
  });
};

exports.getTables = (req, res) => {
  db.query('SELECT * FROM tables', (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};
