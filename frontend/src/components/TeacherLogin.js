import React, { useState } from 'react';
import axios from 'axios';

function TeacherLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        axios.post('/api/users/login', { username, password, role: 'teacher' })
            .then(res => {
                alert('Login successful');
                window.location.href = '/dashboard';
            })
            .catch(err => alert('Login failed'));
    };

    return (
        <div>
            <h2>Teacher Login</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default TeacherLogin;
