const express = require('express');
const { createQuiz, postQuiz, getClassQuizzes } = require('../controllers/quizController');
const router = express.Router();

router.post('/create', createQuiz);
router.post('/post', postQuiz);
router.get('/:classId', getClassQuizzes);

module.exports = router;
