import React, { useState, useEffect } from "react";
import Table from 'react-bootstrap/Table';

const Enhancements = () => {
    const [enhancements, setEnhancements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const enhancementsApiUrl = 'https://64c3e13d67cfdca3b66067d3.mockapi.io/armybuilder/v1/enhancements';

    useEffect(() => {
        const fetchEnhancements = () => {
            fetch(enhancementsApiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setEnhancements(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log("Error fetching enhancements: ", error);
                    setError("Error fetching enhancements");
                    setIsLoading(false);
                });
        };

        fetchEnhancements();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!enhancements || enhancements.length === 0) {
        return <p>No enhancements found</p>;
    }


    return (
        <>

            <Table striped bordered hover variant="dark" className="info-table">
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