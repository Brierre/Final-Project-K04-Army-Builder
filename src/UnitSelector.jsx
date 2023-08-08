import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UnitCard from "./UnitCard";
import RunningTotal from './RunningTotal';


const UnitSelector = ({ armyId, selectedFaction, selectedPoints, username, unitsData }) => {
    const [loading, setLoading] = useState(true);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setUnits(unitsData);
        setLoading(false);
    }, [unitsData]);
    console.log(unitsData);

    if (loading) {
        return <p>Loading...</p>;
    }

    const filteredUnitsByFaction = selectedFaction
        ? units.filter((unit) => unit.army === selectedFaction.name)
        : units;

    console.log(selectedFaction, selectedPoints, armyId, filteredUnitsByFaction);

    return (
        <>
            {selectedPoints !== undefined && <RunningTotal selectedPoints={selectedPoints} />}

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
                                showAddButton={true}
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
                                showAddButton={true}
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
                                showAddButton={true}
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
                                showAddButton={true}
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
                                showAddButton={true}
                            />
                        ))}
                </Tab>
            </Tabs>
            <div className="go-to-army">
                <Link to="/my-army-page">
                    <button>I am finished. Go to My Army!</button>
                </Link>
            </div>
        </>
    );
};

export default UnitSelector;