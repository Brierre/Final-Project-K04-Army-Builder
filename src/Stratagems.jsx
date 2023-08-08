import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const Stratagems = () => {
    const [stratagems, setStratagems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const stratagemsApiUrl = '`https://64d11527ff953154bb79f408.mockapi.io/K04Builder/v1/stratagems';

    useEffect(() => {
        const fetchStratagems = () => {
            fetch(stratagemsApiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setStratagems(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching stratagems: ", error);
                    setError("Error fetching stratagems");
                    setIsLoading(false);
                });
        };

        fetchStratagems();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!stratagems || stratagems.length === 0) {
        return <p>No stratagems found</p>;
    }

    return (
        <>

            <Table striped bordered hover variant="dark" className="info-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>When to Use</th>
                        <th>Target</th>
                        <th>Effect</th>
                        <th>Restrictions</th>
                        <th>Army</th>
                        <th>Detachment</th>
                    </tr>
                </thead>
                <tbody>
                    {stratagems && stratagems.map((stratagem, index) => (
                    <tr key={stratagem.id}>
                        <td>{index + 1}</td>
                        <td>{stratagem.name}</td>
                        <td>{stratagem.stratagemType}</td>
                        <td>{stratagem.whenToUse}</td>
                        <td>{stratagem.target}</td>
                        <td>{stratagem.effect}</td>
                        <td>{stratagem.restrictions}</td>
                        <td>{stratagem.army}</td>
                        <td>{stratagem.detachment}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}
export default Stratagems;