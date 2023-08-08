import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RunningTotal from './RunningTotal';
import UnitCardList from "./UnitCardList";


const UnitSelector = ({ armyId, selectedFaction, selectedPoints, username, unitsData }) => {
    const [loading, setLoading] = useState(true);
    const [units, setUnits] = useState([]);
    const [armyUnits, setArmyUnits] = useState([]);

    useEffect(() => {
        setUnits(unitsData);
        setLoading(false);
    }, [unitsData]);
    console.log(unitsData);

    if (loading) {
        return <p>Loading...</p>;
    }

    const handleAddUnit = async (cardData) => {
        try {
            await handleAddCardToArmy(cardData);
            // Update the armyUnits state or any other necessary logic
        } catch (error) {
            console.log('Error adding unit:', error);
        }
    };

    const filteredUnitsByFaction = selectedFaction
        ? units.filter((unit) => unit.army === selectedFaction.name)
        : units;

    console.log(selectedFaction, selectedPoints, armyId, filteredUnitsByFaction);

    return (
        <>
            {selectedPoints !== undefined && <RunningTotal selectedPoints={selectedPoints} />}
    <UnitCardList
        unitCards={filteredUnitsByFaction}
        showAddButton={true}
        unitsData={unitsData}
        onAddUnit={handleAddUnit} // Pass the function here
    />
            <h3> Select Units </h3>
            <Tabs
                defaultActiveKey="INFANTRY"
                id="fill-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="INFANTRY" title="Infantry">
                    Choose a unit: Infantry Units
                            <UnitCardList
                            unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'INFANTRY')}
                            showAddButton={true}
                            unitsData={unitsData}
                            onAddUnit={handleAddUnit}
                        />

                </Tab>
                <Tab eventKey="MOUNTED" title="Mounted">
                    Choose a unit: Mounted Units
                            <UnitCardList
                            unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'MOUNTED')}
                            showAddButton={true}
                            unitsData={unitsData}
                            onAddUnit={handleAddUnit}
                        />

                </Tab>
                <Tab eventKey="VEHICLE" title="Vehicles">
                    Choose a unit: Vehicles
                            <UnitCardList
                            unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'VEHICLE')}
                            showAddButton={true}
                            unitsData={unitsData}
                            onAddUnit={handleAddUnit}
                        />

                </Tab>
                <Tab eventKey="MONSTERS" title="Monsters">
                    Choose a unit: Monsters
                            <UnitCardList
                            unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'MONSTERS')}
                            showAddButton={true}
                            unitsData={unitsData}
                            onAddUnit={handleAddUnit}
                        />

                </Tab>
                <Tab eventKey="FORTIFICATION" title="Fortifications">
                    Choose a unit: Fortifications
                            <UnitCardList
                            unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'FORTIFICATION')}
                            showAddButton={true}
                            unitsData={unitsData}
                            onAddUnit={handleAddUnit}
                        />

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