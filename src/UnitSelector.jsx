import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UnitCardList from './UnitCardList';
import UnitCard from "./UnitCard";
import { getUnitsData } from './rest/api';
import Navigation from './Navigation';

const mockapiUnitsJson = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/units';

const UnitSelector = ({ selectedFaction }) => {
    const [unitCards, setUnitCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [units, setUnits] = useState([]);
    //selectedFaction = "Space Marines";

    useEffect(() => {
        getUnitsData().then((data) => {
            setUnits(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    function getFilteredUnitsByFaction(selectedFaction) {
        return units.filter((unit) => unit.army === selectedFaction);
    };

    function getFilteredUnitsByCategory(category) {
        return units.filter((unit) => unit.category === category);
    }

        return (
            <>
                <h3> Select Units </h3>
                <Tabs
                    defaultActiveKey="INFANTRY"
                    id="fill-tab-example"
                    className="mb-3"
                    justify
                >
                    <Tab eventKey="INFANTRY" title="Infantry">
                        Choose a unit: Infantry Units
                        <UnitTab unitCardsTab={getFilteredUnitsByCategory('INFANTRY')} />
                    </Tab>
                    <Tab eventKey="MOUNTED" title="Mounted">
                        Choose a unit: Mounted Units
                        <UnitTab unitCardsTab={getFilteredUnitsByCategory('MOUNTED')} />
                    </Tab>
                    <Tab eventKey="VEHICLE" title="Vehicles">
                        Choose a unit: Vehicles
                        <UnitTab unitCardsTab={getFilteredUnitsByCategory('VEHICLE')} />
                    </Tab>
                    <Tab eventKey="MONSTERS" title="Monsters">
                        Choose a unit: Monsters
                        <UnitTab unitCardsTab={getFilteredUnitsByCategory('MONSTERS')} />
                    </Tab>
                    <Tab eventKey="FORTIFICATION" title="Fortifications">
                        Choose a unit: Fortifications
                        <UnitTab unitCardsTab={getFilteredUnitsByCategory('FORTIFICATION')} />
                    </Tab>
                </Tabs>

                <UnitCardList unitCards={units} />
            <div>
                <Link to="/detachment-selector">
                    <button>Back to Select Detachment</button>
                </Link>
                <Link to="/my-army">
                    <button>Confirm Selection</button>
                </Link>
            </div>
        </>
    );
};

    const UnitTab = ({ unitCardsTab }) => {
        if (unitCardsTab.length === 0) {
            return <div>No units in this category.</div>;
        }
        // console.log(unitCardsTab);
        return (
            <div className="unit-cards">
            {unitCardsTab.map((unitCard) => (
                unitCard && unitCard.name && 
                <UnitCard 
                    key={unitCard.id} 
                    unitCard={unitCard} 
                />
            ))}
        </div>
        );
    };

export default UnitSelector;