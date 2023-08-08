import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginUser = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        fetch(
            `https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/users?username=${username}&password=${password}`
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to login');
                }
                return response.json();
            })
            .then((data) => {
                if (data.length === 1) {
                    // Successful login, update the isLoggedIn state in the parent component
                    onLogin(username);
                    // Redirect the user to the army builder page after successful login
                    navigate('/');
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                alert('Error logging in. Please try again.');
            });
    };

    return (
        <div>
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