import React from 'react';
import CryptoGraph from './CryptoGraph';
import './App.css';


class Holdings extends React.Component {
    
    render() {
        return (
            <div className="holdings">
                <CryptoGraph />
            </div>
        );
    }
}

export default Holdings;