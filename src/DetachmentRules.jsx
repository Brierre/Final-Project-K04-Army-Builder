import React, { useState, useEffect } from "react";
import { getDetachmentRules } from "./rest/api";
import Table from 'react-bootstrap/Table';

const DetachmentRules = () => {
    const [detachmentRules, setDetachmentRules] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetachmentRules = async () => {
            try {
                const response = await getDetachmentRules();
                setDetachmentRules(response.data);
                setIsLoading(false);
                console.log(response.data);
            } catch (e) {
                console.log("Error fetching detachmentRules:", e);
                setError("Error fetching detachmentRules");
                setIsLoading(false);
            }
        };

        fetchDetachmentRules();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!detachmentRules || detachmentRules.length === 0) {
        return <p>No detachment rules found</p>;
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