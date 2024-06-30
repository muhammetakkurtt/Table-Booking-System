const db = require('../config/config');

exports.getAllUsers = (req, res) => {
  if (req.userRole !== 'admin') {
    return res.status(403).send('Access denied');
  }

  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
};
