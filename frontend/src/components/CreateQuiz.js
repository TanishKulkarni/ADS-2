import React, { useState } from 'react';
import axios from 'axios';

function CreateQuiz() {
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const handleQuizCreate = () => {
        const formData = new FormData();
        formData.append('pdf', file);
        formData.append('questions', questions);
        formData.append('difficulty', difficulty);

        axios.post('/api/quizzes/create', formData)
            .then(res => {
                alert('Quiz created successfully');
            })
            .catch(err => alert('Quiz creation failed'));
    };

    return (
        <div>
            <h2>Create Quiz</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <input type="number" placeholder="Number of Questions" onChange={(e) => setQuestions(e.target.value)} />
            <select onChange={(e) => setDifficulty(e.target.value)}>
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button onClick={handleQuizCreate}>Create Quiz</button>
        </div>
    );
}

export default CreateQuiz;
