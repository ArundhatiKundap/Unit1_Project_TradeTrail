import { useState } from 'react';
import '../styles/dashboard.css';
import Addtrade from './AddTrade';
import ShowTrades from './ShowTrades';

export default function Dashboard() {
 
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showAddTrade, setShowAddTrade] = useState(false);
    const [showTrades, setShowTrades] = useState(true);
    const [selectedTrade, setSelectedTrade] = useState(null);
    const [formKey, setFormKey] = useState(0); // used to remount Addtrade this logic is adding to solve problem of when click cancel button and again add trade tab form is not displaying without refresh. 
    const loggedUser = JSON.parse(localStorage.getItem("loggedInUser") || "{}");

    if (!loggedUser.email) {
        return <div>Please log in to view your dashboard.</div>;
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setShowAddTrade(false); // Hide form when switching tabs
        if (tab === "dashboard") {
         
            setShowTrades(true);
        }
    };
    const handleAddTradeClick = () => {
        setFormKey((prev) => prev + 1); // Force remount
        setSelectedTrade(null); // clear previous edit
        setShowAddTrade(true);
        setShowTrades(true);
    };
    const handleEditTrade = (trade) => {
        setFormKey((prev) => prev + 1);
        setSelectedTrade(trade);

        setShowAddTrade(true);
        setShowTrades(true);
    };

    const handleDeleteTrade = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this trade?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:3001/trades/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete the trade.");
            }

            alert("Trade deleted successfully.");
            setFormKey((prev) => prev + 1); // Refresh trade list
        } catch (error) {
            console.error("Error deleting trade:", error);
            alert("There was an error deleting the trade.");
        }
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
                        {showAddTrade && <Addtrade
                            key={formKey}
                            userEmail={loggedUser.email}
                            selectedTrade={selectedTrade}
                            onSubmitSuccess={() => {
                              
                                setFormKey((prev) => prev + 1); // Refresh ShowTrades
                            }}
                            
                        />}
                    
                      <div className ="tradelist">
                            <h3>Trades</h3>
                            
                            {showTrades && <ShowTrades                       
                                userEmail={loggedUser.email}
                                onEdit={handleEditTrade}
                                onDelete={handleDeleteTrade}
                                refreshKey={formKey}     // refresh trigger
                            />}
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
        <>
        <div className="username">
                            <span><h2>Welcome {loggedUser.name}</h2></span>
                        </div>
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
        </>
    );
}