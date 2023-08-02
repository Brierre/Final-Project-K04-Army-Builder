import React, { useState, useEffect } from "react";
import { getStratagems } from "./rest/api";
import Table from 'react-bootstrap/Table';

const Stratagems = () => {
    const [stratagems, setStratagems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStratagems = async () => {
            try {
                const response = await getStratagems();
                setStratagems(response.data);
                setIsLoading(false);
                console.log(response.data);
            } catch (e) {
                console.log("Error fetching stratagems:", e);
                setError("Error fetching stratagems");
                setIsLoading(false);
            }
        };

        fetchStratagems();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!stratagems || stratagems.length === 0) {
        return <p>No stratagems found</p>;
    }

    return (
        <>

            <Table striped bordered hover variant="dark">
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