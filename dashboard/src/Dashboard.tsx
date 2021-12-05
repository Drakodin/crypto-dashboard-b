import React from 'react';
import PieDiagram from './PieDiagram';
import PieDiagrLabel from './PieDiagrLabel';

class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <PieDiagram />
                <PieDiagrLabel/>
            </div>
        );
    }
}

export default Dashboard;