import React, {useState, useEffect} from 'react';
import {
    LineChart,
    ResponsiveContainer,
    Tooltip,
    Line,
    XAxis,
    YAxis,
} from 'recharts';
import axios from 'axios';
import {Tabs, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function CryptoGraph() {
    var APIname = "bitcoin";
    var currency = "usd";
    var urlDay = "https://api.coingecko.com/api/v3/coins/" + APIname + "/market_chart?vs_currency=" + currency + "&days=" + 1;
    var urlWeek = "https://api.coingecko.com/api/v3/coins/" + APIname + "/market_chart?vs_currency=" + currency + "&days=" + 7;
    var urlMonth = "https://api.coingecko.com/api/v3/coins/" + APIname + "/market_chart?vs_currency=" + currency + "&days=" + 30;
    var urlYear = "https://api.coingecko.com/api/v3/coins/" + APIname + "/market_chart?vs_currency=" + currency + "&days=" + 365;
    var url5Years = "https://api.coingecko.com/api/v3/coins/" + APIname + "/market_chart?vs_currency=" + currency + "&days=" + 1825;

    const [data, setData] = useState<any>();
    const [data2, setData2] = useState<any>();
    const [data3, setData3] = useState<any>();
    const [data4, setData4] = useState<any>();
    const [data5, setData5] = useState<any>();

    useEffect(() => {
        axios.all([
            axios.get(urlDay),
            axios.get(urlWeek),
            axios.get(urlMonth),
            axios.get(urlYear),
            axios.get(url5Years)
        ]).then(axios.spread((one, two, three, four, five) => {
            setData(one.data);
            setData2(two.data);
            setData3(three.data);
            setData4(four.data);
            setData5(five.data);
        }))
        .catch(error => console.log(error));
    }, []);

    var dataSorted = [];
    var pricesArr = [];
    var dataSorted2 = [];
    var pricesArr2 = [];
    var dataSorted3 = [];
    var pricesArr3 = [];
    var dataSorted4 = [];
    var pricesArr4 = [];
    var dataSorted5 = [];
    var pricesArr5 = [];

    var minData = 0;
    var maxData = 0;
    var minData2 = 0;
    var maxData2 = 0;
    var minData3 = 0;
    var maxData3 = 0;
    var minData4 = 0;
    var maxData4 = 0;
    var minData5 = 0;
    var maxData5 = 0;

    if (data != null) {
        for (var i = 0; i < data.prices.length; i++) {
            const temp = {time: new Date(data.prices[i][0]).toLocaleString(), price: data.prices[i][1]};
            dataSorted.push(temp);
            pricesArr.push(data.prices[i][1]);
        }
        minData = Math.min(...pricesArr);
        maxData = Math.max(...pricesArr);
    }

    if (data2 != null) {
        for (var i = 0; i < data2.prices.length; i++) {
            const temp = {time: new Date(data2.prices[i][0]).toLocaleString(), price: data2.prices[i][1]};
            dataSorted2.push(temp);
            pricesArr2.push(data2.prices[i][1]);
        }
        minData2 = Math.min(...pricesArr2);
        maxData2 = Math.max(...pricesArr2);
    }

    if (data3 != null) {
        for (var i = 0; i < data3.prices.length; i++) {
            const temp = {time: new Date(data3.prices[i][0]).toLocaleString(), price: data3.prices[i][1]};
            dataSorted3.push(temp);
            pricesArr3.push(data3.prices[i][1]);
        }
        minData3 = Math.min(...pricesArr3);
        maxData3 = Math.max(...pricesArr3);
    }

    if (data4 != null) {
        for (var i = 0; i < data4.prices.length; i++) {
            const temp = {time: new Date(data4.prices[i][0]).toLocaleString(), price: data4.prices[i][1]};
            dataSorted4.push(temp);
            pricesArr4.push(data4.prices[i][1]);
        }
        minData4 = Math.min(...pricesArr4);
        maxData4 = Math.max(...pricesArr4);
    }

    if (data5 != null) {
        for (var i = 0; i < data5.prices.length; i++) {
            const temp = {time: new Date(data5.prices[i][0]).toLocaleString(), price: data5.prices[i][1]};
            dataSorted5.push(temp);
            pricesArr5.push(data5.prices[i][1]);
        }
        minData5 = Math.min(...pricesArr5);
        maxData5 = Math.max(...pricesArr5);
    }

    return (
        <div className="">
            <h1 id="coin-title">{APIname}</h1>
            <Tabs defaultActiveKey="today" id="tabs" className="mb-2" >
                <Tab eventKey="today" title="Today">
                    <ResponsiveContainer width="50%" height="100%" minWidth={500} minHeight={350}>
                        <LineChart data={dataSorted} margin={{left: -57}}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis domain={["minData", "maxData"]} tick={false}/>
                            <Tooltip />
                            <Line dataKey="price" stroke="#FF69B4" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Tab>
                <Tab eventKey="this-week" title="This Week">
                    <ResponsiveContainer width="50%" height="100%" minWidth={500} minHeight={350}>
                        <LineChart data={dataSorted2} margin={{left: -57}}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis domain={["minData2", "maxData2"]} tick={false}/>
                            <Tooltip />
                            <Line dataKey="price" stroke="#FF69B4" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Tab>
                <Tab eventKey="this-month" title="This Month">
                    <ResponsiveContainer width="50%" height="100%" minWidth={500} minHeight={350}>
                        <LineChart data={dataSorted3} margin={{left: -57}}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis domain={["minData3", "maxData3"]} tick={false}/>
                            <Tooltip />
                            <Line dataKey="price" stroke="#FF69B4" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Tab>
                <Tab eventKey="this-year" title="This Year">
                    <ResponsiveContainer width="50%" height="100%" minWidth={500} minHeight={350}>
                        <LineChart data={dataSorted4} margin={{left: -57}}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis domain={["minData4", "maxData4"]} tick={false}/>
                            <Tooltip />
                            <Line dataKey="price" stroke="#FF69B4" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Tab>
                <Tab eventKey="5-years" title="5 Years">
                    <ResponsiveContainer width="50%" height="100%" minWidth={500} minHeight={350}>
                        <LineChart data={dataSorted5} margin={{left: -57}}>
                            <XAxis dataKey="time" tick={false}/>
                            <YAxis domain={["minData5", "maxData5"]} tick={false}/>
                            <Tooltip />
                            <Line dataKey="price" stroke="#FF69B4" dot={false}/>
                        </LineChart>
                    </ResponsiveContainer>
                </Tab>
            </Tabs>
        </div>
    );
}

export default CryptoGraph;