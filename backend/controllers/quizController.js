const db = require('../db');
const axios = require('axios');

exports.createQuiz = (req, res) => {
    const { classId, questions, difficulty } = req.body;
    const file = req.file;
    
    // Assuming Python ML model is hosted on localhost:5001 for simplicity
    const formData = new FormData();
    formData.append('pdf', file.buffer);
    formData.append('questions', questions);
    formData.append('difficulty', difficulty);

    axios.post('http://localhost:5001/generate_quiz', formData)
        .then(response => {
            const quizData = response.data;
            const query = 'INSERT INTO quizzes (classId, quizCode, quizData) VALUES (?, ?, ?)';
            db.query(query, [classId, quizData.quizCode, JSON.stringify(quizData)], (err, result) => {
                if (err) return res.status(500).json({ message: 'Quiz creation failed' });
                res.status(200).json({ message: 'Quiz created successfully', quizData });
            });
        })
        .catch(err => res.status(500).json({ message: 'Quiz generation failed' }));
};

exports.postQuiz = (req, res) => {
    const { quizCode } = req.body;
    const query = 'UPDATE quizzes SET posted = 1 WHERE quizCode = ?';
    
    db.query(query, [quizCode], (err, result) => {
        if (err) return res.status(500).json({ message: 'Quiz posting failed' });
        res.status(200).json({ message: 'Quiz posted successfully' });
    });
};

exports.getClassQuizzes = (req, res) => {
    const { classId } = req.params;
    const query = 'SELECT * FROM quizzes WHERE classId = ?';
    
    db.query(query, [classId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch quizzes' });
        res.status(200).json(results);
    });
};
