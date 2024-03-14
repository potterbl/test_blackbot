import {observer} from "mobx-react-lite";
import PriceStore from "../store/PriceStore";

import "../styles/Calculator.css"
import {useMemo, useState} from "react";

const Calculator = () => {
    const {sellPrice, buyPrice} = PriceStore,
        [currentCurrency, setCurrentCurrency] = useState<{currency: string, value: number}>({currency: "ETH", value: 0}),
        [action, setAction] = useState("buy")

    const usdtCurrency = useMemo(() => {
        if(currentCurrency.currency === "USDT"){
            return currentCurrency.value
        } else if(currentCurrency.currency === "ETH"){
            if(action === "buy"){
                return (currentCurrency.value * buyPrice).toFixed(3)
            } else if (action === "sell") {
                return (currentCurrency.value * sellPrice).toFixed(3)
            }
        }
    }, [currentCurrency, action, sellPrice, buyPrice])

    const ethCurrency = useMemo(() => {
        if(currentCurrency.currency === "ETH"){
            return currentCurrency.value
        } else if(currentCurrency.currency === "USDT"){
            if(action === "buy"){
                return (currentCurrency.value / buyPrice).toFixed(3)
            } else if(action === "sell") {
                return (currentCurrency.value / sellPrice).toFixed(3)
            }
        }
    }, [currentCurrency, action, sellPrice, buyPrice])

    const handleChange = (currency: string, value: number) => {
        setCurrentCurrency({currency, value})
    }

    const handleChangeAction = () => {
        setAction(prevState => prevState === "buy" ? "sell" : "buy")
    }

    return (
        <div className="calculator">
            <div className="calculator-head">
                <h2>ETH:</h2>
                <input value={ethCurrency} onChange={(e) => handleChange("ETH", parseFloat(e.target.value))} type="number" className="calculator-input"/>
            </div>
            <div className="calculator-body">
                <div className="action-wrapper" onClick={handleChangeAction}>
                    <span className="action" style={{transform: `translateX(${action === "buy" ? "0px" : "calc(100% + 12px)"})`}}>

                    </span>
                </div>
                <h2>{action}</h2>
            </div>
            <div className="calculator-footer">
                <h2>USDT:</h2>
                <input value={usdtCurrency} onChange={(e) => handleChange("USDT", parseFloat(e.target.value))} type="number" className="calculator-input"/>
            </div>
        </div>
    );
};

export default observer(Calculator)
