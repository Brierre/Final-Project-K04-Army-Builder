import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Button from 'react-bootstrap/Button';
import RunningTotal from './RunningTotal';
import UnitCardList from "./UnitCardList";
// import { calculateTotalPoints } from "./utils";


const UnitSelector = ({ armyId, selectedFaction, selectedPoints, username, unitsData }) => {
    const [loading, setLoading] = useState(true);
    const [units, setUnits] = useState([]);
    const [armyUnits, setArmyUnits] = useState([]);

    useEffect(() => {
        setUnits(unitsData);
        setLoading(false);
    }, [unitsData]);
    // console.log(unitsData);

    if (loading) {
        return <p>Loading...</p>;
    }

    const onAddUnit = (addedUnit) => {
        setArmyUnits(prevArmyUnits => [...prevArmyUnits, addedUnit]);
    };

    const handleAddUnit = async (cardData) => {
//         console.log('card data: ', cardData);
//         const unitPoints = cardData.points;
//         console.log('unit points: ', unitPoints);
//         const remainingPoints = selectedPoints - calculateTotalPoints([...armyUnits, cardData]);
// console.log('remaining points: ', remainingPoints);

//         if (unitPoints > remainingPoints || remainingPoints < 0) {
//             alert('You can\'t handle my strongest unit!');
//         } else {
            try {
                onAddUnit(cardData);
            } catch (error) {
                console.log('Error adding unit:', error);
            }
//         };
    };
    const filteredUnitsByFaction = selectedFaction
        ? units.filter((unit) => unit.army === selectedFaction.name)
        : units;

    // console.log(selectedFaction, selectedPoints, armyId, filteredUnitsByFaction);

    return (
        <>
            {/* <RunningTotal selectedPoints={selectedPoints} armyUnits={armyUnits} /> */}

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
                        username={username}
                        armyId={armyId}
                    />
                </Tab>
                <Tab eventKey="MOUNTED" title="Mounted">
                    Choose a unit: Mounted Units
                    <UnitCardList
                        unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'MOUNTED')}
                        showAddButton={true}
                        unitsData={unitsData}
                        onAddUnit={handleAddUnit}
                        username={username}
                        armyId={armyId}
                    />
                </Tab>
                <Tab eventKey="VEHICLE" title="Vehicles">
                    Choose a unit: Vehicles
                    <UnitCardList
                        unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'VEHICLE')}
                        showAddButton={true}
                        unitsData={unitsData}
                        onAddUnit={handleAddUnit}
                        username={username}
                        armyId={armyId}
                    />
                </Tab>
                <Tab eventKey="MONSTERS" title="Monsters">
                    Choose a unit: Monsters
                    <UnitCardList
                        unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'MONSTERS')}
                        showAddButton={true}
                        unitsData={unitsData}
                        onAddUnit={handleAddUnit}
                        username={username}
                        armyId={armyId}
                    />
                </Tab>
                <Tab eventKey="FORTIFICATION" title="Fortifications">
                    Choose a unit: Fortifications
                    <UnitCardList
                        unitCards={filteredUnitsByFaction.filter((unit) => unit.category === 'FORTIFICATION')}
                        showAddButton={true}
                        unitsData={unitsData}
                        onAddUnit={handleAddUnit}
                        username={username}
                        armyId={armyId}
                    />
                </Tab>
            </Tabs>
            <div className="go-to-army">
                <Link to="/my-army-page">
                    <Button>I am finished. Go to My Army!</Button>
                </Link>
            </div>
        </>
    );
};

export default UnitSelector;