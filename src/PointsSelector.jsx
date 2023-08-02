import React, { useState } from 'react';
// import UserInformationForm from './UserInformationForm';

const PointsSelector = ({ onSelectPoints }) => {
    const [inputValue, setInputValue] = useState('');
    
    const handleChange = (event) => {
        const value = event.target.value;
        // Check if the value is a valid number and within the specified range and multiple of 5
        if (/^[0-9]*$/.test(value)) {
            const numericValue = parseInt(value, 10);
            if (numericValue >= 500 && numericValue <= 5000 && numericValue % 5 === 0) {
                setInputValue(value);
            }
        }
    };

    const handleScroll = (e) => {
        const delta = Math.sign(e.deltaY);
        const numericValue = parseInt(inputValue, 10);
        const newValue = isNaN(numericValue) ? 0 : numericValue + delta * 5;
        if (newValue >= 500 && newValue <= 5000) {
            setInputValue(newValue.toString());
        }
    };

    const handleSavePoints = () => {
        const numericValue = parseInt(inputValue, 10);
        if (!isNaN(numericValue) && numericValue >= 500 && numericValue <= 5000 && numericValue % 5 === 0) {
            onSelectPoints(numericValue);
        } else {
            console.log('Please enter a valid number between 500 and 5000, multiple of 5.');
        }
    };

    
    return (
        <div>
            {/* <UserInformationForm /> */}
            <h3>Choose how many points for your army.</h3>
            <input
                className="points"
                type="number"
                value={inputValue}
                onChange={handleChange}
                onWheel={handleScroll}
                min={500}
                max={5000}
                step={5}
                placeholder="points"
            />
            <button 
                className='btn-submit' 
                type='submit'
                onClick={handleSavePoints}>Save Points
            </button>
        </div>
    );
};

export default PointsSelector;