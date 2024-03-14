import './App.css';
import {useEffect} from "react";
import PriceStore from "./store/PriceStore";
import Calculator from "./components/Calculator";

function App() {

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const tickers = JSON.parse(event.data);
      const ethusdtTicker = tickers.find((ticker: any) => ticker.s === 'ETHUSDT');
      if (ethusdtTicker) {
        const sellPrice = ethusdtTicker.b
        const buyPrice = ethusdtTicker.a

        PriceStore.setSellPrice(sellPrice)
        PriceStore.setBuyPrice(buyPrice)
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <main className="App">
      <Calculator/>
    </main>
  );
}

export default App;
