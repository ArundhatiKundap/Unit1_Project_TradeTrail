import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    BarController
);
import '../styles/dashboard.css';

export default function ShowTrades({ userEmail, onEdit, onDelete, refreshKey }) {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        const fetchTrades = async () => {
            try {
                const res = await fetch("http://localhost:3001/trades");
                const data = await res.json();
                const userTrades = data.filter(trade => trade.userEmail === userEmail)
                                      .sort((a, b) => new Date(a.date) - new Date(b.date));
                setTrades(userTrades);
            } catch (err) {
                console.error('Failed to fetch trades', err);
            }
        };

        fetchTrades(); 
    }, [userEmail, refreshKey]);

  
        const chartData = {
            labels: trades.map(trade => trade.date),
            datasets: [
                {
                    label: 'Net Daily P&L',
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: trades.map(trade => Number(trade.profitLoss)),
                },
            ]
                
        };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                border: { dash: [6, 6], display: true },
                grid: {
                    display: true // Display grid lines for the y-axis
                },
                ticks: {
                    stepSize: 10,
                    padding: 10
                }
            },
            x: {
                beginAtZero: true,
                border: { display: true },
                grid: {
                    display: false // No display of grid lines for the x-axis
                },
                ticks: {
                    padding: 7
                }
            }
        },
    }

    return (
        <div className ="row-container">
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
                            <th>Win/Loss</th>
                            <th>Actions</th>
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
                                <td>{trade.win ? 'Win' : 'Loss'}</td>
                                <td>
                                    <button onClick={() => onEdit(trade)}>Edit</button>
                                    <button onClick={() => onDelete(trade.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
            <div className="chart-container">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}