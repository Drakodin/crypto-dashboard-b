import './PieDiagram.css';
import { PieChart, Pie, Cell} from 'recharts';
import {useState, useEffect} from 'react';
// var height = require('text-height');
// const data = [
// 	{ name: 'BitCoin', value: 400 },
// 	{ name: 'Ethereum', value: 300 },
// 	{ name: 'Litecoin', value: 300 },
// 	{ name: 'Dogecoin', value: 200 },
// ];
const COLORS = ['#14508f', '#2085ec', '#2e2c4d', '#72b4eb', '#8464a0', '#cea9bc',];

function PieDiagram() {
  const [data, setData] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [selected, setSelected] = useState({
    name : "",
    id: "",
    coins: 0
});
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
            setData(myJson);
        }); 
}
useEffect(()=> {
    getData()
}, [])

  data.sort((a :any, b:any) => parseFloat(b.coins) - parseFloat(a.coins));

  const cy = 300
  const cx = 250
return (
  
        <div id='pie-diagram'>
          <PieChart width={600} height={600}>
          <Pie 
            data={data} 
            dataKey="coins" 
            innerRadius={200} 
            outerRadius={250} 
            // fill="green"
            cx={cx}
            cy={cy}
            // label={renderCustomizedLabel}
          >
            {
						data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
          </Pie>
          {/* {prinTotal(cx,cy)} */}
          {/* {lolrender(cx,cy)} */}
        </PieChart>
        </div>
);
}

export default PieDiagram;
