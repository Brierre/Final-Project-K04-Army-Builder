import React, { useState } from 'react';
import FactionCard from './FactionCard';

const FactionCardList = ({ factionsData, onSelectFaction, selectedPoints }) => {
    const [selectedFaction, setSelectedFaction] = useState(null);

    const handleSelectFaction = (faction) => {
        setSelectedFaction(faction);
    };

    const handleStartOver = () => {
        setSelectedFaction(null);
    };
    
    return (
        <div>
            <h3>Choose a Faction</h3>
            {selectedFaction ? (
                <>
                    <FactionCard
                        faction={selectedFaction}
                        onSelectFaction={onSelectFaction}
                        selected={true} 
                    />
                    <div>
                        <button onClick={handleStartOver}>Start Over?</button>
                
                        <button onClick={() => onSelectFaction(selectedFaction)}>Confirm Selection</button>
                    </div>

                </>
            ) : (
                factionsData && factionsData.length > 0 ? (
                    factionsData.map((faction) => (
                        <FactionCard
                            key={faction.id}
                            faction={faction}
                            onSelectFaction={handleSelectFaction} // Use the local handler
                        />
                    ))
                ) : (
                    <p>Loading factions...</p>
                )
            )}
        </div>
    );
};

export default FactionCardList;



// import React, { useState } from 'react';
// import FactionCard from './FactionCard';
// import { getFactions, createPlayerArmy } from './rest/api';

// const FactionCardList = ({ factionsData, onSelectFaction, selectedPoints }) => {
//     const [isFactionSelected, setIsFactionSelected] = useState(false);

//     const handleSelectFaction = async (factionsData) => { 
//         setIsFactionSelected(true);
//         onSelectFaction({ faction: factionsData, points: selectedPoints });          
//     };

//     const handleStartOver = () => {
//         setIsFactionSelected(false);
//     }
    
//     return (
//         <div>
//             <h3>Choose a Faction</h3>
//             {isFactionSelected ? (
//                 <>
//                 <FactionCard
//                     onSelectFaction={handleSelectFaction}
//                     selected={true} 
//                 />
//                 <div>
//                     <button onClick={handleStartOver}>Start Over</button>
//                 </div>
//                 </>
//             ) : (
//                 factionsData && factionsData.length > 0 ? (
//                 factionsData.map((faction) => (
//                     <FactionCard
//                         key={faction.id}
//                         faction={faction}
//                         onSelectFaction={handleSelectFaction}
//                     />
//                 ))
//                 ) : (
//                     <p>Loading factions...</p>
//                 )
//             )}
//         </div>
//     );
// };

// export default FactionCardList;
