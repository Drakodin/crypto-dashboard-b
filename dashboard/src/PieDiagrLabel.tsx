import './PieDiagram.css';
import { getTextWidth } from 'get-text-width';
var height = require('text-height');


//initial constatns idk
const data = [
	{ name: 'BitCoin', value: 400 },
	{ name: 'Ethereum', value: 300 },
	{ name: 'Litecoin', value: 300 },
	{ name: 'Dogecoin', value: 200 },
];
const COLORS = ['#2e2c4d', '#14508f', '#2085ec', '#72b4eb', '#8464a0', '#cea9bc',];
const cy = 152.2+ 250
const cx = 250


//general constants used throughout the code
  let sum = 0 //sum of all values
  let max = 0 //max length of a line
  for (let i=0; i<data.length;i++){
    sum += data[i]['value']
  }
  const dataStr = data.map((dict) => dict.name+` - ${(dict.value/sum * 100).toFixed(0)}%`)
  dataStr.unshift('Total - '+sum+'$') //contains all lines to be rendered
  for (let i=0; i<dataStr.length;i++){
    if (max < getTextWidth(dataStr[i])){
      max = getTextWidth(dataStr[i])
    }
  }
  max = max - 28 //adjusting max for the circles on the left
  const margintopused = '2px'
  const heightLetter = height(dataStr[0])['height']
  const heightBlock = (heightLetter+parseInt(margintopused.slice(0,-2),10))*data.length
  // console.log('height'+heightLetter)
  // console.log('heightbig'+heightBlock)

  // let box = document.querySelector('.circle');
  // let width1 = box.offsetWidth;
  // let height1 = box.offsetHeight;
  // console.log('width1 '+width1+'  height1 '+height1)


//funcs

const labelsrender = () => {
  let tex = ''
  const divStyle = {marginTop:margintopused}
  // let xcord = 0
  // let ycord = 0

  return (
    dataStr.slice(1).map((dict,index) => ( 
      tex = dataStr.slice(1)[index],
      // xcord = cx-max/2,
      // ycord = cy-heightBlock/2+index*20 + 100,
      <div style={divStyle}>
        <text  fill="black" key={index}>
          {tex}
        </text> 
      </div>
      ) 
    )
  )
}

const circlesrender = () => {
  // const newmargin = parseInt(margintopused.slice(0,-2),10) +6.6
  // const newbotmargn = newmargin +3
  const divStyle = {marginTop:'8.6px', marginBottom:'14.px'};
  let colorstyle={}
  // let xcord = 0
  // let ycord = 0

  return (
    dataStr.slice(1).map((dict,index) => ( 
      // xcord = cx-max/2,
      // ycord = cy-heightBlock/2+index*20 + 25,
      colorstyle = {backgroundColor:COLORS[index % COLORS.length]},
      <div style={divStyle}>
        <div className='circle' style= {colorstyle}></div>
      </div>
      ) 
    )
  ) 
}

const totalrender = () => {
  let tex = ''
  // let xcord = 0
  // let ycord = 0

  return (
    tex = dataStr[0],
    <div>
      <text  fill="black" id='total'>
        {tex}
      </text> 
    </div>
  )
}

function PieDiagrLabel() {
  //coordinates and styles for absolute layout
  const xcord = cx-max/2;
  const ycord = cy-heightBlock/2;
  console.log(xcord,ycord)
  const xcords = Math.round(xcord).toString(10)+'px';
  const ycords = Math.round(ycord).toString(10)+'px';
  console.log(xcords,ycords)

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
          {circlesrender()}
        </div>
        <div style={divStyle}> 
          {labelsrender()}
        </div>
        <div style={divStyle3}> 
          {totalrender()}
        </div>
      </div>
  )
}

export default PieDiagrLabel;