import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArmyBuilderHome from './ArmyBuilderHome';
import PointsSelector from './PointsSelector';
import FactionSelector from './FactionSelector';
import DetachmentSelector from './DetachmentSelector';
import UnitSelector from './UnitSelector';
import MyArmyPage from './MyArmyPage';

function ArmyBuilderApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ArmyBuilderHome />} />
                <Route path="/faction-selector" element={<FactionSelector />} />
                <Route path="/detachment-selector" element={<DetachmentSelector />} />
                <Route path="/unit-selector" element={<UnitSelector />} />
                <Route path="/my-army" element={<MyArmyPage />} />
                {/* Add other routes here if needed */}
            </Routes>
        </Router>
    );
}

export default ArmyBuilderApp;