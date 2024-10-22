import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h2>Teacher Dashboard</h2>
            <Link to="/create-class">Create Class</Link>
            <Link to="/class/1">View Class</Link>
        </div>
    );
}

export default Dashboard;
