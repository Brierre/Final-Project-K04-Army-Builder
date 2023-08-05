import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateUserAccount = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [avatar, setAvatar] = useState('');

    const userEndpoint = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users';
    const history = useNavigate();

    const handleCreateAccount = () => {
        if (!name || !username || !password || !verifyPassword) {
            alert('Please fill in all required fields.');
            return;
        }

        if (password !== verifyPassword) {
            alert('Passwords do not match.');
            return;
        }

        const user = {
            name,
            username,
            password,
            avatar: avatar && avatar.name,
        }
    

    fetch(userEndpoint, {
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
            history('/login');

        })
        .catch((error) => {
            console.error('Error creating user account:', error);
            alert('Error creating account. Please try again.');
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