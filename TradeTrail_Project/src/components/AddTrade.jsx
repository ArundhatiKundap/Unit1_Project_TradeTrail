import { useState } from "react";
import '../styles/dashboard.css';
import ShowTrades from './ShowTrades';
export default function Addtrade() {
    
    const [showForm, setShowForm] = useState(true);
    const [formData, setFormData] = useState({
        instrument: "Stock",
        tradeSpan: "Intraday",
        stockName: "",
        tradeType: "Buy",
        date: "",
        entryPrice: null,
        exitPrice: null,
        quantity: null,
        profitLoss: null,
        win: ""

    });
   
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setFormData((prev) => ({
            ...prev,
            [name]: val,
        }));
    };
    const winloss = (entryPrice,exitPrice) => {
        if (formData.tradeType.toLowerCase() === "buy") {
            return exitPrice > entryPrice;
        } else if (formData.tradeType.toLowerCase() === "sell") {
            return entryPrice > exitPrice;
        } else {
            alert("Select TradeType");
            return null;
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const win = winloss(formData.entryPrice, formData.exitPrice);
        let profitLoss;
        profitLoss = (formData.exitPrice - formData.entryPrice) * formData.quantity;    
        if ((formData.tradeType.toLowerCase() === "sell") && win) {
            profitLoss = profitLoss * -1;
        }

        const date = String(formData.date);

        const tradeData = {
            ...formData,
            date,
            profitLoss,
            win,
        };

        

        try {
            const addrecord = await fetch("http://localhost:3001/trades", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tradeData),
            });
            if (addrecord.ok) {
                alert("Trade added!");
                resetForm();
                setShowForm(true);
            }
        } catch (err) {
            console.error("Error posting trade:", err);
        }

        <ShowTrades/>
    };
    const resetForm = () => {
        setFormData({
            instrument: "Stock",
            tradeSpan: "Intraday",
            stockName: "",
            tradeType: "Buy",
            date: "",
            entryPrice: null,
            exitPrice: null,
            quantity: null,
            profitLoss: null,
            win: ""
        });
    };

    const win = winloss(formData.entryPrice, formData.exitPrice);
    let profitLoss;
    profitLoss = (formData.exitPrice - formData.entryPrice) * formData.quantity;
    if ((formData.tradeType.toLowerCase() === "sell") && win) {
        profitLoss = profitLoss * -1;
    }
    const date = String(formData.date);
    return (
        <div className="page-wrapper">
            
            {showForm && (
                <form className="form-container">
                    <h3>Add Trade</h3>

                    <hr />
                    <div className="stock-info">
                        <div class="input-group">
                        <label>
                            <strong>Instrument</strong>
                            </label>
                        
                        <input
                            type="Text"
                            name="instrument"
                            value={formData.instrument}
                            onChange={handleChange}
                            maxLength={30}
                        />
                        </div>
                        <div class="input-group">
                        <label>
                            <strong>Stock Name</strong>
                        </label>
                        <input
                            type="Text"
                            name="stockName"
                            value={formData.stockName}
                            onChange={handleChange}
                            maxLength={30}
                            />
                        </div>
                        <div class="input-group">
                        <label>
                            <strong>Date</strong>
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={date}
                            onChange={handleChange}
                            maxLength={30}
                            />
                        </div>
                        <div className="input-group">
                            <label><strong>Trade Type</strong></label>
                            <div className="radio-options">
                                <label>
                                    <input
                                        type="radio"
                                        name="tradeType"
                                        value="Buy"
                                        checked={formData.tradeType === "Buy"}
                                        onChange={handleChange}
                                    />
                                    Buy
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="tradeType"
                                        value="Sell"
                                        checked={formData.tradeType === "Sell"}
                                        onChange={handleChange}
                                    />
                                    Sell
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="stockprice-info">
                        <div class="input-group">
                        <label>
                            <strong>Entry Price</strong>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="entryPrice"
                            value={formData.entryPrice}
                            onChange={handleChange}
                            maxLength={30}
                            />
                        </div>
                        <div class="input-group">
                        <label>
                            <strong>Exit Price</strong>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="exitPrice"
                            value={formData.exitPrice}
                            onChange={handleChange}
                            maxLength={30}
                            />
                        </div>
                        <div class="input-group">
                        <label>
                            <strong>Quantity</strong>
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            maxLength={30}
                            />
                        </div>
                    </div>
                    <div className="stockprice-info">
                        <div class="input-group">
                        <label>
                            <strong>Profit/Loss</strong>
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="profitLoss"
                            value={profitLoss.toFixed(2)} readOnly
                            />
                        </div>
                        <div class="input-group">
                        <label><strong>Win/Loss</strong></label>
                        <input
                            type="text"
                            name="win"
                            value={
                                formData.entryPrice > 0 && formData.exitPrice > 0 && formData.quantity > 0
                                    ? win
                                        ? "Win"
                                        : "Loss"
                                    : ""
                            } readOnly
                            />
                          </div>
                        </div>

                        <div className="button-group">
                            <button type="submit" className="btn-submit" onClick={handleSubmit}>Add Trade</button>
                            <button type="button" className="btn-cancel" onClick={() => {
                                resetForm();
                                setShowForm(false);
                            }}>Cancel</button>
                        </div>
                    
                </form>
                
            )}
        </div>
       
    );
    
}