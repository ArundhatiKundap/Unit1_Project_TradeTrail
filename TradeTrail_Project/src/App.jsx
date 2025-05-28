//import { useState } from 'react'
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from './components/DashBoard';
import Signup from './pages/Signup';
import ProtectedRoute from './hooks/ProtectedRoute';

export default function App() {
    return (
        <div className="background-container">
            <BrowserRouter>
                <Header />            
                <Routes>             
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} /> 
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Signup />} />  
                        <Route
                           path="/dashboard"
                           element={
                              <ProtectedRoute>
                                 <Dashboard />
                             </ProtectedRoute>
                        }
                    />
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
