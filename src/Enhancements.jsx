import React, { useState, useEffect } from "react";
import { getEnhancements } from "./rest/api";
import Table from 'react-bootstrap/Table';

const Enhancements = () => {
    const [enhancements, setEnhancements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnhancements = async () => {
            try {
                const response = await getEnhancements();
                setEnhancements(response.data);
                setIsLoading(false);
                console.log(response.data);
            } catch (e) {
                console.log("Error fetching enhancements:", e);
                setError("Error fetching enhancements");
                setIsLoading(false);
            }
        };

        fetchEnhancements();
    }, []);
    
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!enhancements || enhancements.length === 0) {
        return <p>No enhancements found</p>;
    }

    return (
        <>

            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Cost</th>
                        <th>Army</th>
                    </tr>
                </thead>
                <tbody>
                    {enhancements && enhancements.map((enhancement, index) => (
                    <tr key={enhancement.id}>
                        <td>{index + 1}</td>
                        <td>{enhancement.name}</td>
                        <td>{enhancement.description}</td>
                        <td>{enhancement.cost}</td>
                        <td>{enhancement.army}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )

}

export default Enhancements;