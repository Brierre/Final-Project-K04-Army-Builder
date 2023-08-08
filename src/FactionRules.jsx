import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const FactionRules = () => {
    const [factionRules, setFactionRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const factionRulesApiUrl = "https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/army-rules"; // Replace YOUR_API_ID with your actual API ID

    useEffect(() => {
        const fetchFactionRules = () => {
            fetch(factionRulesApiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setFactionRules(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching faction rules:", error);
                    setError("Error fetching faction rules");
                    setIsLoading(false);
                });
        };

        fetchFactionRules();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!factionRules || factionRules.length === 0) {
        return <p>No faction rules found</p>;
    }


    return (
        <>

            <Table striped bordered hover variant="dark" className="info-table">
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