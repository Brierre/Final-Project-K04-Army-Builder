import React, { useState } from 'react';
import Navigation from './Navigation';

const CreateUserAccount = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const handleCreateAccount = () => {
        // Implement form validation and user creation logic here
        // Encrypt the password using bcrypt.js before making the API call
    };

    return (
        <div>
            <h2>Create New Account</h2>
            <form>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Create Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label>
                    Verify Password:
                    <input
                        type="password"
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                </label>
                <label>
                    Select Avatar Picture:
                    <input type="file" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])} />
                </label>
                <button type="button" onClick={handleCreateAccount}>
                    Create Account
                </button>
            </form>
        </div>
    );
};

export default CreateUserAccount;