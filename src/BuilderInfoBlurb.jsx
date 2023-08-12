import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function BuilderInfoBlurb({ isLoggedIn }) {
    const navigate = useNavigate();

    const handleBuildArmyClick = ({ isLoggedIn }) => {
        console.log('is someone logged in? ', isLoggedIn);
        if (!isLoggedIn) {
            alert('Please log in to create and save your army.');
        } else {
            navigate('/army-builder');
        }
    };

    return (
        <div className="builder-paragraphs">
            <p>Welcome to K04 Army Builder, an application that may or
                may not have anything to do with Warhammer 40K. With
                this app, you will be able to view and choose a 40K
                faction, a detachment (only one detachment is available
                per faction for v10 at this time), and units to build
                an army of your custom size, from 500-5000 points. You
                can also take a look at the lists of stratagems available
                to each faction, rules for each faction or detachment,
                and enhancements.</p>

            <p>Future plans for the app include secure login and user
                creation/maintenance, the ability to search your army
                list, and options like gear, weapons, and hero selection.
            </p>

            <p>The first thing to decide when planning a game is how
                big you want your game to be and choose a points value
                for your army. A smaller point value usually results
                in fewer large models, since they cost more points per
                model. Some factors that go into this decision are:</p>
            <ul className="builder-paragraphs">
                <li>Time constraints</li>
                <li>Which models you have</li>
                <li>How you want to transport your army</li>
                <li>Personal preference</li>
            </ul>
            <h5 className="builder-paragraphs">Be sure to click the login button above to create and
                save your army!</h5>

            <div>
                <Link to="/army-builder">
                    <Button variant="secondary" className="build-btn" size="lg" active onClick={handleBuildArmyClick}>
                        Build Army
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default BuilderInfoBlurb;