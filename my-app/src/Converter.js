import { useEffect, useState } from "react"

const Converter = () => {

    const [curriens, setCurriens] = useState([]);
    const [selectedCurr, setSelectedCurr] = useState(null);
    const [amount, setAmount] = useState(null);
    const [convertedAmount, setConvertedAmount] = useState(0);

    const getCurrenies = async () => {
        const resp = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        const data = await resp.json();

        const currencyArr = Object.keys(data).map(key => ({id: key, name: data[key]}));
       
        setCurriens(currencyArr);
    }

    const getRate = async () => {
        const resp = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json');
        const data = await resp.json();
        return data.usd;
    }

    const convert = async () => {
        console.log(selectedCurr);
        console.log(amount);
        const usdRate = await getRate();
        const selectedRate = usdRate[selectedCurr];

        const res = amount / selectedRate;

        setConvertedAmount(res);
    }

    useEffect(() => {
        getCurrenies();
    }, {});


    return (
        <div className="conveter">
            Amount: <input value={amount} onChange={(event) => {
                setAmount(parseInt(event.target.value));
            }

            } />
            From: <select onInput={(event) => {
                setSelectedCurr(event.target.value);
            }}>
                    {curriens.map(({id, name}) => (<option value={id}>{name}</option>))}
                </select>
            to: <select>
                    <option value='usd'>USD</option>
                </select>

            <button onClick={convert}>Convert</button>

            <div>Converted Amount: {convertedAmount}</div>
        </div>
    )
}

export default Converter;