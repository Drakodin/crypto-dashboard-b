import React, {useState, useEffect} from 'react'
import CryptoGraph from './CryptoGraph';
import HoldingsGraph from './HoldingsGraph';

const Holdings = () => {
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
    return (
        <div id="browse">
            <table>
                <tbody>
                    <tr>
                        <td>
                        <input
                type = "text"
                placeholder="Search Holdings"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />
            <div id="coinsList" style={{height: "800px", width: "500px"}}>
            {
                data && data.length > 0 && data.filter((value: {name: string})=> {
                    if(searchTerm == "") {
                        return value
                    }
                    else if(value.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    }
                }).map((item: {name: string, id: string, coins: number})=><p className="coinItem" onClick={() => {setSelected(item)}}>{item.name}  <span style={{color: 'gray'}}>{item.coins}</span></p>)
            }
            </div>
                        </td>
                        <td>
                            {selected.name == "" ? "" : <CryptoGraph id={selected.id} name={selected.name}/>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Holdings
