import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ArmyBuilderApp from './ArmyBuilderApp';

function App() {
  return (
    <div className="bg-light container-fluid App">
      <div className='row'>
        <ArmyBuilderApp />
      </div>
    </div>
  );
}

export default App;
