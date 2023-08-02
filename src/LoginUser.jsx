import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

const LoginUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const handleLogin = () => {
        // Implement user validation and login logic here
        // Make API call to validate user and log them in
        // Redirect to the user account page after successful login
        history.push('/user');
    };

    return (
        <div>
            <Navigation />
            <h2>Login</h2>
            <form>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            <p>
                Don't have an account? <Link to="/create-account">Create New Account</Link>
            </p>
        </div>
    );
};

export default LoginUser;