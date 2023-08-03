import React, { useState, useEffect } from "react";
import { getDetachmentRules } from "./rest/api";
import Table from 'react-bootstrap/Table';

const DetachmentRules = () => {
    const [detachmentRules, setDetachmentRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const detachmentRulesApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/detachment-rules';

    useEffect(() => {
        const fetchDetachmentRules = () => {
            fetch(detachmentRulesApiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setDetachmentRules(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching detachment rules: ", error);
                    setError("Error fetching detachment rules");
                    setIsLoading(false);
                });
        };

        fetchDetachmentRules();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!detachmentRules || detachmentRules.length === 0) {
        return <p>No detachmentRules found</p>;
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
                        <th>Detachment</th>
                    </tr>
                </thead>
                <tbody>
                    {detachmentRules && detachmentRules.map((detachmentRule, index) => (
                    <tr key={detachmentRule.id}>
                        <td>{index + 1}</td>
                        <td>{detachmentRule.name}</td>
                        <td>{detachmentRule.description}</td>
                        <td>{detachmentRule.army}</td>
                        <td>{detachmentRule.detachment}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default DetachmentRules;