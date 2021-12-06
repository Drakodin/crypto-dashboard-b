import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function HoldingsGraph() {
    const dataImported = [
        {
            id: 'bitcoin',
            shares: 60
        },
        {
            id: 'ethereum',
            shares: 40
        },
        {
            id: 'binancecoin',
            shares: 10
        },
    ];

    var coins = [];
    if (dataImported != null) {
        for (var i = 0; i < dataImported.length; i++) {
            coins.push(dataImported[i].id)
        }
    }
    var str = '';
    for (var i = 0; i < coins.length; i++) {
        if (i === coins.length - 1) {
            str += coins[i];
        } else {
            str += coins[i] + '%2C%20';
        }
    }

    var url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + str + '&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h'

    const [data, setData] = useState<any>([]);

    useEffect(() => {
        axios.get(url).then(res => {
            setData(res.data);
        })
        .catch(error => console.log(error));
    }, []);
    console.log(data)

    var netEarnings = 0;
    var netPercentageChange = 0;

    for (var i = 0; i < data.length; i++) {
        netEarnings += data[i].price_change_24h;
        netPercentageChange += data[i].price_change_percentage_24h;
    }

    return (
        <div>
            <h2>Your net earnings in the last 24 hours:</h2>
            <h1>{netEarnings.toFixed(2)}</h1>
            <h2>Your percentage change in the last 24 hours:</h2>
            <h1>{netPercentageChange.toFixed(2)}%</h1>
        </div>
    );
    
}

export default HoldingsGraph;