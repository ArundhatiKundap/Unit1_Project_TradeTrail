import { useState,useEffect } from "react";
import '../styles/dashboard.css';

export default function ShowTrades() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                const res = await fetch("http://localhost:3001/trades");
                const data = await res.json();
                setTrades(data);
            } catch (err) {
                console.error('Failed to fetch trades', err);
            }
        }, 200);

        return () => clearTimeout(timer); // cleanup
    }, []);

    return (

        <div className="trade-table-container">
            {trades.length === 0 ? (
                <p>No records to show</p>
            ) : (
                <table className="trade-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Stock</th>
                            <th>Type</th>
                            <th>Entry</th>
                            <th>Exit</th>
                            <th>Quantity</th>
                            <th>Profit/Loss</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trades.map((trade, index) => (
                            <tr key={index}>
                                <td>{trade.date}</td>
                                <td>{trade.stockName}</td>
                                <td>{trade.tradeType}</td>
                                <td>{trade.entryPrice}</td>
                                <td>{trade.exitPrice}</td>
                                <td>{trade.quantity}</td>
                                <td>{trade.profitLoss}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}