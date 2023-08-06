import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UnitCard from "./UnitCard";
import { getUnitsData } from './rest/api';
import RunningTotal from './RunningTotal';
import { useLocation } from "react-router-dom";

//const mockapiUnitsJson = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/units';

const UnitSelector = () => {
    const [unitCards, setUnitCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [units, setUnits] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const selectedFaction = JSON.parse(searchParams.get('selectedFaction'));
    const username = searchParams.get('username');
    const armyId = searchParams.get('armyId');

    //selectedFaction = "Space Marines";
    console.log('selectedFaction in UnitSelector:', selectedFaction);
    useEffect(() => {
        getUnitsData().then((data) => {
            setUnits(data);
            console.log(data);
            setLoading(false);
        });
    },[]);

    if (loading) {
        return <p>Loading...</p>;
    }

    const filteredUnitsByFaction = selectedFaction
        ? units.filter((unit) => unit.army === selectedFaction.name)
        : units;

return (
    <>
        {selectedFaction?.points !== undefined && <RunningTotal selectedPoints={selectedFaction.points} />}

        <h3> Select Units </h3>
        <Tabs
            defaultActiveKey="INFANTRY"
            id="fill-tab-example"
            className="mb-3"
            justify
        >
            <Tab eventKey="INFANTRY" title="Infantry">
                Choose a unit: Infantry Units
                {filteredUnitsByFaction
                .filter((unit) => unit.category === 'INFANTRY')
                .map((unit) => (
                    <UnitCard
                        key={unit.id}
                        {...unit}
                        selectedFaction={selectedFaction}
                        username={username}
                        armyId={armyId}
                    />
                ))}
            </Tab>
            <Tab eventKey="MOUNTED" title="Mounted">
                Choose a unit: Mounted Units
                {filteredUnitsByFaction
                .filter((unit) => unit.category === 'MOUNTED')
                .map((unit) => (
                    <UnitCard
                        key={unit.id}
                        {...unit}
                        selectedFaction={selectedFaction}
                        username={username}
                        armyId={armyId}
                    />
                ))}               
                </Tab>
            <Tab eventKey="VEHICLE" title="Vehicles">
                Choose a unit: Vehicles
                {filteredUnitsByFaction
                .filter((unit) => unit.category === 'VEHICLE')
                .map((unit) => (
                    <UnitCard
                        key={unit.id}
                        {...unit}
                        selectedFaction={selectedFaction}
                        username={username}
                        armyId={armyId}
                    />
                ))}               
                </Tab>
            <Tab eventKey="MONSTERS" title="Monsters">
                Choose a unit: Monsters
                {filteredUnitsByFaction
                .filter((unit) => unit.category === 'MONSTERS')
                .map((unit) => (
                    <UnitCard
                        key={unit.id}
                        {...unit}
                        selectedFaction={selectedFaction}
                        username={username}
                        armyId={armyId}
                    />
                ))}                
                </Tab>
            <Tab eventKey="FORTIFICATION" title="Fortifications">
                Choose a unit: Fortifications
                {filteredUnitsByFaction
                .filter((unit) => unit.category === 'FORTIFICATION')
                .map((unit) => (
                    <UnitCard
                        key={unit.id}
                        {...unit}
                        selectedFaction={selectedFaction}
                        username={username}
                        armyId={armyId}
                    />
                ))}
            </Tab>
        </Tabs>
        <div>
            <Link to="/my-army-page">
                <button>I am finished. Go to My Army!</button>
            </Link>
        </div>
    </>
);
};

export default UnitSelector;