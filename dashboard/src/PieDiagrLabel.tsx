import './PieDiagram.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { getTextWidth } from 'get-text-width';
var height = require('text-height');


const COLORS = ['#14508f', '#2085ec', '#2e2c4d', '#72b4eb', '#8464a0', '#cea9bc',];

const cy = 170+ 250
const cx = 250

const margintopused = '2px'


//funcs

const labelsrender = (dataStr: any[]) => {
  let tex = ''
  const divStyle = {marginTop:margintopused}

  return (
    dataStr.slice(1).map((dict,index) => ( 
      tex = dataStr.slice(1)[index],
      <div style={divStyle}>
        <text  fill="black" key={index}>
          {tex}
        </text> 
      </div>
      ) 
    )
  )
}

const circlesrender = (dataStr: any[]) => {
  // const newmargin = parseInt(margintopused.slice(0,-2),10) +6.6
  // const newbotmargn = newmargin +3
  const divStyle = {marginTop:'8.6px', marginBottom:'14.px'};
  let colorstyle={}

  return (
    dataStr.slice(1).map((dict,index) => ( 
      colorstyle = {backgroundColor:COLORS[index % COLORS.length]},
      <div style={divStyle}>
        <div className='circle' style= {colorstyle}></div>
      </div>
      ) 
    )
  ) 
}

const totalrender = (data:any,apidata:any) => {
  // console.log('totalrender apidata')
  // console.log(apidata)
  let tex = ''
  console.log('data with problems')
  console.log(data)
  console.log(typeof data[0])

  if ((apidata === [])){
    tex = 'Total'
  }
  else{
    let sum = 0
    for (let i=0; i<apidata.length;i++){
      sum += parseFloat(apidata[i].current_price)*parseFloat(data[i].coins)
    }
    // console.log(sum)
    tex = 'Total - '+Math.round(sum)+'$'
  }
  
  return (
    <div>
      <text  fill="black" id='total'>
        {tex}
      </text> 
    </div>
  )
}

function PieDiagrLabel() {

  const [data , setData] = useState<any>([]);
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

  data.sort((a:any, b:any) => parseFloat(b.coins) - parseFloat(a.coins));

  
  let coins = []
  for (let i = 0; i < data.length; i++) {
    coins.push(data[i].name)
}
  let str = '';
    for (let i = 0; i < data.length; i++) {
      if (i === data.length - 1) {
            str += coins[i].toLowerCase() ;
        } else {
            str += coins[i].toLowerCase() + '%2C%20';
        }
    }

    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=' + str
    
    const [apidata, setApidata] = useState<any>([]);

    const getApi = async () => {
      const response = await fetch(url);
      //I wanted to sustitute the link with the url variable, but if I do so some error appears and it doesn t work//
      const data = await response.json();
      setApidata(data);
      console.log('datadatdatdata')
      console.log(data)
    }
useEffect(() => {
  getApi()
}, []);
console.log(apidata)

  let sum = 0 //sum of all values
  let max = 0 //max length of a line
  for (let i=0; i<data.length;i++){
    sum += data[i]['coins']
  }
  const dataStr = data.map((dict : any) => dict.name+` - ${(dict.coins/sum * 100).toFixed(0)}%`)
  dataStr.unshift('Total - '+sum+'$') //contains all lines to be rendered
  for (let i=0; i<dataStr.length;i++){
    if (max < getTextWidth(dataStr[i])){
      max = getTextWidth(dataStr[i])
    }
  }
  max = max - 0 //adjusting max for the circles on the left
  const heightLetter = height(dataStr[0])['height']
  const heightBlock = (heightLetter+parseInt(margintopused.slice(0,-2),10))*data.length



  //coordinates and styles for absolute layout
  const xcord = cx-max/2;
  const ycord = cy-heightBlock/2;
  // console.log(xcord,ycord)
  const xcords = Math.round(xcord).toString(10)+'px';
  const ycords = Math.round(ycord).toString(10)+'px';
  // console.log(xcords,ycords)

  const divStyle = {
    position: 'absolute' as 'absolute',
    top: ycords, left: xcords,
    // backgroundColor: 'Aquamarine'
  };

  const xcord2 = xcord-20
  const xcords2 = Math.round(xcord2).toString(10)+'px';
  const divStyle2 = {
    position: 'absolute' as 'absolute',
    top: ycords, left: xcords2,
    // backgroundColor: 'LightSkyBlue'
  }

  const ycord3 = ycord-28
  const ycords3 = Math.round(ycord3).toString(10)+'px';
  const divStyle3 = {
    position: 'absolute' as 'absolute',
    top: ycords3, left: xcords,
    // backgroundColor: 'LightGray'
  }

  return(
      <div id='pie-label'>
        <div style={divStyle2}> 
          {circlesrender(dataStr)}
        </div>
        <div style={divStyle}> 
          {labelsrender(dataStr)}
        </div>
        <div style={divStyle3}> 
          {totalrender(data,apidata)}
        </div>
      </div>
  )
}

export default PieDiagrLabel;