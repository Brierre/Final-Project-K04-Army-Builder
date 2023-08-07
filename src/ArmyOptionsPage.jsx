import React from "react";

const ArmyOptionsPage = () => {
    const usersApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users';
const username = 'bruce';
    const updateAUser = async ( dataToUpdate) => {
        try {
            const resp = await fetch(`https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/users/2/test`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToUpdate)
            });
    
            if (!resp.ok) {
                throw new Error('Failed to update user');
            }
    
            return await resp.json();
        } catch (e) {
            console.log('Could not update user: ', e);
            throw e;
        }
    };
    
    const dataToUpdate = {
        name: 'foofoo',
        innerAnimal: 'lion'
    };
    
    const updateUserData = async () => {
        try {
            const updatedUser = await updateAUser(dataToUpdate);
            console.log('User updated:', updatedUser);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    
    updateUserData(); 

    return (
        <>
        Options will go here one day, but that is not this day.

        </>
    );
}

export default ArmyOptionsPage;