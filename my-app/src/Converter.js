import { useEffect, useState } from "react"

const Converter = () => {

    const [curriens, setCurriens] = useState([]);
    const [selectedCurr, setSelectedCurr] = useState(null);
    const [amount, setAmount] = useState(null);

    const getCurrenies = async () => {
        const resp = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json');
        const data = await resp.json();

        const currencyArr = Object.keys(data).map(key => ({id: key, name: data[key]}));
       
        setCurriens(currencyArr);
    }

    const convert = () => {

    }

    useEffect(() => {
        getCurrenies();
    }, {});


    return (
        <div className="conveter">
            Amount: <input value={} />
            From: <select onInput={(event) => {
                setSelectedCurr(event.target.value);
            }}>
                    {curriens.map(({id, name}) => (<option value={id}>{name}</option>))}
                </select>
            to: <select>
                    <option value='usd'>USD</option>
                </select>

            <button onClick={convert}></button>
        </div>
    )
}

export default Converter;