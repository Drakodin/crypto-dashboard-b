import React from 'react';
import HoldingsGraph from './HoldingsGraph';
import PieDiagram from './PieDiagram';
import PieDiagrLabel from './PieDiagrLabel';
import './App.css';

class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <div id='pie-chart'>
                    <PieDiagram />
                    <PieDiagrLabel/>
                </div>
                <HoldingsGraph/>
            </div>
        );
    }
}

export default Dashboard;