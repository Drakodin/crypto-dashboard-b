import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function HoldingsGraph() {
    // const dataImported = [
    //     {
    //         id: 'bitcoin',
    //         shares: 60
    //     },
    //     {
    //         id: 'ethereum',
    //         shares: 40
    //     },
    //     {
    //         id: 'binancecoin',
    //         shares: 10
    //     },
    // ];
    const [dataImported, setImported] = useState([{id: "", name: "", coins: 0}]);
    const getData=()=> {
        fetch('holdings.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            })
            .then(function(response){
                //console.log(response)
                return response.json();
            })
            .then(function(myJson) {
                setImported(myJson);
            }); 
    }

    useEffect(() => {
        getData();
    }, [])
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

    var netEarnings = 0;
    var netPercentageChange = 0;

    for (var i = 0; i < data.length; i++) {
        netEarnings += data[i].price_change_24h;
        netPercentageChange += data[i].price_change_percentage_24h;
    }

    var isUp1 = true;
    var isUp2 = true;

    if (netEarnings >= 0) {
        isUp1 = true;
    } else {
        isUp1 = false;
    }

    if(netPercentageChange >= 0) {
        isUp2 = true;
    } else {
        isUp2 = false;
    }
    

    return (
        <div id="holdings-graph">
            <h2>Your net earnings in the last 24 hours:</h2>
            <h1 style={{color: isUp1 ? 'limegreen' : 'red'}}>${netEarnings.toFixed(2)}</h1>
            <br></br>
            <h2>Your percentage change in the last 24 hours:</h2>
            <h1 style={{color: isUp2 ? 'limegreen' : 'red'}}>{netPercentageChange.toFixed(2)}%</h1>
        </div>
    );
    
}

export default HoldingsGraph;