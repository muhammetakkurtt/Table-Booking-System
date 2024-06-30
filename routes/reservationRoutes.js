const express = require('express');
const { makeReservation, getUserReservations, getAllReservations, updateReservationStatus, cancelReservation } = require('../controllers/reservationController');
const { verifyToken } = require('../middleware/authMiddleware');
const db = require('../config/config');
const router = express.Router();

router.post('/', verifyToken, makeReservation);
router.get('/', verifyToken, getUserReservations);
router.get('/admin', verifyToken, getAllReservations);
router.put('/admin/:id', verifyToken, updateReservationStatus);


router.delete('/', verifyToken, cancelReservation);


router.get('/tables', verifyToken, (req, res) => {
  db.query('SELECT * FROM tables', (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
});

module.exports = router;
