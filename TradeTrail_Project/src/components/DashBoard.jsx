import { useState } from 'react';
import '../styles/dashboard.css';
import Addtrade from './AddTrade';
import ShowTrades from './ShowTrades';

export default function Dashboard() {
 
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddTrade, setShowAddTrade] = useState(false);
    const [showTrades, setShowTrades] = useState(true);
    const [formKey, setFormKey] = useState(0); // used to remount Addtrade this logic is adding to solve problem of when click cancel button and again add trade tab form is not displaying without refresh. 
     

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowAddTrade(false); // Hide form when switching tabs
        if (tab === "dashboard") {
            setShowTrades(true);
        }
    };
    const handleAddTradeClick = () => {
        setFormKey((prev) => prev + 1); // Force remount
        setShowAddTrade(true);
        setShowTrades(true);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="tabcontent">
                        <div className="button-group">
                            <button className="btn-submit" onClick={handleAddTradeClick}>
                                + Add Trade
                            </button>
                        </div>
                        {showAddTrade && <Addtrade key={formKey} />}
                    
                      <div className ="tradelist">
                            <h3>Trades</h3>
                            {showTrades && <ShowTrades key={formKey} />}
                      </div>
                    </div>  
                );
            case 'journal':
                return (
                    <div className="tabcontent">
                        <h3>Journal</h3>
                        <p>Show records</p>
                    </div>
                );
            case 'search':
                return (
                    <div className="tabcontent">
                        <h3>Search</h3>
                        <p>Search for stockName</p>
                    </div>
                );
            default:
                return (
                    <div className="tabcontent">
                        <h3>No Trade</h3>
                    </div>
                );
        }
    };

    return (


        <div className="dashboard-container">
            <div className="vertical-tab">
                <button className="tablinks" onClick={() => handleTabChange('dashboard')}>Dashboard</button>
                <button className="tablinks" onClick={() => handleTabChange('journal')}>Journal</button>
                <button className="tablinks" onClick={() => handleTabChange('search')}>Search</button>
            </div>

            <div className="tabcontent-container">
                {renderTabContent()}
            </div>
        </div>
    );
}