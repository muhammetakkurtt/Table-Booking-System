const db = require('../config/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    try {
        db.query('SELECT email FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Server error');
            }

            if (results.length > 0) {
                return res.status(400).send('Email already exists');
            }

            const hashedPassword = bcrypt.hashSync(password, 8);

            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('Database insertion error:', err);
                    return res.status(500).send('Server error');
                }
                res.status(201).send('User registered successfully');
            });
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Server error');
    }
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).send('Server error');
            }

            if (results.length === 0) {
                return res.status(400).send('Invalid email or password');
            }

            const user = results[0];

            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                return res.status(400).send('Invalid email or password');
            }

            const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });

            res.status(200).send({ auth: true, token: token });
        });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Server error');
    }
};
