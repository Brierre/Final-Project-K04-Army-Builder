import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseUrl = 'https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1';

const CreateUserAccount = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const usersApiUrl = `${baseUrl}/users`;    
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        if (!name || !username || !password || !verifyPassword) {
            alert('Please fill in all required fields.');
            return;
        }

        if (password !== verifyPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Check if the username already exists
        fetch(`${usersApiUrl}?username=${encodeURIComponent(username)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    alert('Username is already taken. Please choose a different username.');
                } else {

                    const user = {
                        name,
                        username,
                        password,
                        avatar: avatar && avatar.name,
                    };

                    fetch(usersApiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(user),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error('Failed to create user account');
                            }
                            alert('Account created successfully!');
                            resetForm();
                            navigate('/login');

                        })
                        .catch((error) => {
                            console.error('Error creating user account:', error);
                            alert('Error creating account. Please try again.');
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error checking username availability:', error);
                    alert('Error checking username availability. Please try again.');
                });
    };   

    const resetForm = () => {
        setName('');
        setUsername('');
        setPassword('');
        setVerifyPassword('');
        setAvatar('');
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