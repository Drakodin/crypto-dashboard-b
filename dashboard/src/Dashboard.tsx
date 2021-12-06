import React from 'react';
import HoldingsGraph from './HoldingsGraph';
import PieDiagram from './PieDiagram';
import PieDiagrLabel from './PieDiagrLabel';

class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <PieDiagram />
                <PieDiagrLabel/>
                <HoldingsGraph/>
            </div>
        );
    }
}

export default Dashboard;