const db = require('../db');

exports.loginUser = (req, res) => {
    const { username, password, role } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ? AND role = ?';
    
    db.query(query, [username, password, role], (err, result) => {
        if (err) return res.status(500).json({ message: 'Login failed' });
        if (result.length > 0) return res.status(200).json({ message: 'Login successful' });
        res.status(400).json({ message: 'Invalid credentials' });
    });
};
