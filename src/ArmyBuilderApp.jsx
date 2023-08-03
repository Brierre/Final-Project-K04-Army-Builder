import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import ArmyBuilder from './ArmyBuilder';
import UnitSelector from './UnitSelector';
import MyArmyPage from './MyArmyPage';
import LoginUser from './LoginUser';
import CreateUserAccount from './CreateUserAccount';
import Navigation from './Navigation';
import FactionRules from './FactionRules';
import DetachmentRules from './DetachmentRules';
import Enhancements from './Enhancements';
import Stratagems from './Stratagems';


function ArmyBuilderApp() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {

        setIsLoggedIn(true);
    };

    const handleLogout = () => {

        setIsLoggedIn(false);
    };


    return (
        <Router>
            <Navigation isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/army-builder"
                    element={
                        <ArmyBuilder
                            isLoggedIn={isLoggedIn}
                            onLogin={handleLogin}
                            onLogout={handleLogout}
                        />
                    } />
                <Route path="/unit-selector" element={<UnitSelector />} />
                <Route path="/my-army" element={<MyArmyPage />} />
                <Route path="/login" element={<LoginUser />} />
                <Route path="/create-account" element={<CreateUserAccount />} />
                <Route path="/faction-rules" element={<FactionRules />} />
                <Route path="/detachment-rules" element={<DetachmentRules />} />
                <Route path="/enhancements" element={<Enhancements />} />
                <Route path="/stratagems" element={<Stratagems />} />
                {/* Add other routes here if needed */}
            </Routes>
        </Router>
    );
}

export default ArmyBuilderApp;