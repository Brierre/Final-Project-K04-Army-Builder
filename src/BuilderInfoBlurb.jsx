import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';

function BuilderInfoBlurb() {
    return (
        <>
            <h5>The first thing to decide when planning a game is how 
                big you want your game to be and choose a points value 
                for your army. A smaller point value usually results 
                in fewer large models, since they cost more points per 
                model. Some factors that go into this decision are:</h5>
                <ul>
                    <li>Time constraints</li>
                    <li>Which models you have</li>
                    <li>How much transport space you need for your army</li>
                    <li>Personal preference</li>
                </ul>

            <div>
                <Link to="/faction-selector">
                    <Button variant="primary" size="lg" active>
                        Build Army
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default BuilderInfoBlurb;