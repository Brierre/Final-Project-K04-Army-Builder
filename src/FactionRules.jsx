import React, { useState, useEffect } from "react";
import { getArmyRules } from "./rest/api";
import Table from 'react-bootstrap/Table';

const FactionRules = () => {
    const [factionRules, setFactionRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFactionRules = async () => {
            try {
                const response = await getArmyRules();
                setFactionRules(response.data);
                setIsLoading(false);
                console.log(response.data);
            } catch (e) {
                console.log("Error fetching factionRules:", e);
                setError("Error fetching faction rules");
                setIsLoading(false);
            }
        };

        fetchFactionRules();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!factionRules || factionRules.length === 0) {
        return <p>No faction rules found</p>;
    }

    return (
        <>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Army</th>
                    </tr>
                </thead>
                <tbody>
                    {factionRules && factionRules.map((factionRule, index) => (
                    <tr key={factionRule.id}>
                        <td>{index + 1}</td>
                        <td>{factionRule.name}</td>
                        <td>{factionRule.description}</td>
                        <td>{factionRule.army}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default FactionRules;