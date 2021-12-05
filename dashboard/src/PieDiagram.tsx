import './PieDiagram.css';
import { PieChart, Pie, Cell} from 'recharts';
// var height = require('text-height');
const data = [
	{ name: 'BitCoin', value: 400 },
	{ name: 'Ethereum', value: 300 },
	{ name: 'Litecoin', value: 300 },
	{ name: 'Dogecoin', value: 200 },
];
const COLORS = ['#2e2c4d', '#14508f', '#2085ec', '#72b4eb', '#8464a0', '#cea9bc',];

function PieDiagram() {

  const cy = 300
  const cx = 250
return (
        <div>
          <PieChart width={600} height={600}>
          <Pie 
            data={data} 
            dataKey="value" 
            innerRadius={200} 
            outerRadius={250} 
            fill="green"
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
