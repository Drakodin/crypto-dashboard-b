import axios from 'axios';
import React, {useState, useEffect} from 'react'
import CryptoGraph from './CryptoGraph';

const Browse = () => {
    const [data, setData] = useState<any>();
    const [searchTerm, setSearchTerm] = useState("");
    const [assets, setAssets] = useState<any>();
    const [buy, setBuy] = useState({name: "", id: "", coins: ""})
    const [coin, setCoin] = useState({
        data : {
            name : "",
            id : "",
            market_data : {
                current_price : {
                    usd: ""
                },
                ath_change_percentage : {
                    usd: ""
                }
            }
        }

    });
    const [selected, setSelected] = useState("");
    const [shares, setShares] = useState("");
    const getAssets=()=> {
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
                setAssets(myJson);
            }); 
    }
    const addAssets =async()=>{
        setBuy({name: coin.data.name, id: coin.data.id, coins: shares}) 
        let oldassets = assets;
        oldassets.push(buy);
        setAssets(oldassets);
    }
    useEffect( ()=> {
        axios.get("https://api.coingecko.com/api/v3/coins/list?include_platform=false", {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
            })
            .then(function(response){
                //console.log(response.data)
                setData(response.data)
            })
            .catch(function(error) {
                console.log(error);
            }); 
        getAssets();

    }, [])
    // useEffect( () => {
    // }, [selected])
    const getCoin = async (id : string) => {
       const coin = await axios.get("https://api.coingecko.com/api/v3/coins/" + id + "?market_data=true", {
           headers : {
               'Content-Type' : 'application/json',
               'Accept' : 'application/json'
           }
        })
        .then(function(response) {
            console.log(response)
            setCoin({
                data : response.data
            });
            setSelected(response.data.id);
        })
        .catch(function(error) {
            console.log(error);
        }); 
    };

    return (
        <div id="browse" style={{width: "100%"}}>
            <table>
                <tbody>
                <tr>
                    <td style={{paddingLeft: "30px"}}>
                    <input
                type = "text"
                placeholder="Browse"
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />
            <div id="coinlist" style={{height: "800px", overflow: 'hidden', overflowY: "scroll"}}>
            {
                data && data.length > 0 && data.filter((value: { id: string; })=> {
                    if(searchTerm == "") {
                        return value
                    }
                    else if(value.id.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return value
                    }
                }).map((item: { id: string , name: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; })=><p className = "coinItem" onClick={() => getCoin(item.id)}>{item.name}</p>)
            }
            </div>
                    </td>
                    <td style={{width: "50%", textAlign: 'center'}}>
                        {selected == "" ? "" : 
                        <div>
                            <CryptoGraph id={selected} name={coin.data.name}/> 
                            <p style={{fontSize: "40px"}}>
                                <span style={{marginRight: "30px"}}>${coin.data.market_data.current_price.usd}</span>
                                <span style={{color: parseFloat(coin.data.market_data.ath_change_percentage.usd) > 0.0 ? "green" : "red"}}> 
                                {coin.data.market_data.ath_change_percentage.usd}%
                                </span>
                            </p>

                            <span>
                                <input type="text" placeholder="Enter Share Amount" onChange={(e) => {
                                    setShares(e.target.value);
                                }}/>
                            <button onClick={()=> {addAssets()}}>Buy Shares</button>
                            <p style={{fontSize: "40px"}}> {shares == "" ? "" : <span>Total Price: ${Number(parseFloat(shares) * parseFloat(coin.data.market_data.current_price.usd)).toFixed(2)}</span>} </p>
                            </span>
                        </div>
                        }
                    </td>
                </tr>
                </tbody>
            </table>

        </div>
    )
}

export default Browse
