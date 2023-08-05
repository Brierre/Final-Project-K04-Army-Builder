import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UnitCard from "./UnitCard";
import { getUnitsData } from './rest/api';
import RunningTotal from './RunningTotal';
import UnitTab from "./UnitTab";
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
            // console.log("Units data:", data);
            setUnits(data);
            setLoading(false);
        });
    }, []);

    console.log("units state: ", units);
        if (loading) {
        return <p>Loading...</p>;
    }

    function getFilteredUnitsByCategory(category) {
        return units.filter((unit) => unit.category === category);
    }


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
                    <UnitTab units={getFilteredUnitsByCategory('INFANTRY')} selectedFaction={selectedFaction} username={username} armyId={armyId} />
                </Tab>
                <Tab eventKey="MOUNTED" title="Mounted">
                    Choose a unit: Mounted Units
                    <UnitTab units={getFilteredUnitsByCategory('MOUNTED')} selectedFaction={selectedFaction} username={username} armyId={armyId} />
                </Tab>
                <Tab eventKey="VEHICLE" title="Vehicles">
                    Choose a unit: Vehicles
                    <UnitTab units={getFilteredUnitsByCategory('VEHICLE')} selectedFaction={selectedFaction} username={username} armyId={armyId} />
                </Tab>
                <Tab eventKey="MONSTERS" title="Monsters">
                    Choose a unit: Monsters
                    <UnitTab units={getFilteredUnitsByCategory('MONSTERS')} selectedFaction={selectedFaction} username={username} armyId={armyId} />
                </Tab>
                <Tab eventKey="FORTIFICATION" title="Fortifications">
                    Choose a unit: Fortifications
                    <UnitTab units={getFilteredUnitsByCategory('FORTIFICATION')} selectedFaction={selectedFaction} username={username} armyId={armyId} />
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