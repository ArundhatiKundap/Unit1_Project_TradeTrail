import React, { useState } from "react";
import '../styles/login.css';
import Dashboard from "../components/DashBoard";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        instruments: ["stock"] // only stock selected
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };


    const resetForm = () => {
        setFormData({
            name: "",
            email: "",
            password: "",
            confirmpassword: "",
            instruments: ["stock"]
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!passwordRegex.test(formData.password)) {
            alert("Password must be at least 8 characters long and include at least one special character and one number.");
            return;
        }

        if (formData.password !== formData.confirmpassword) {
            alert("Passwords do not match");
            return;
        }

        const userInfo = JSON.parse(localStorage.getItem("users") || "[]");
        const emailExists = userInfo.some(user => user.email === formData.email);
        if (emailExists) {
            alert("Email already registered. Please use a different email.");
            return;
        }

        if (
            formData.name.trim() !== "" &&
            formData.email.trim() !== "" &&
            formData.password.trim() !== "" &&
            formData.instruments.length > 0
        ) {
            userInfo.push({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                instruments: formData.instruments
            });

            localStorage.setItem("users", JSON.stringify(userInfo));
            localStorage.setItem("isLoggedIn", "true");
            
            alert("Account created successfully!");
            resetForm();
            
           
            navigate("/dashboard");
            
        } else {
            alert("Please fill in all fields.");
            return;
        }
    };
    


    return (
        <div className="page-wrapper">
           
                <form className="form-container" onSubmit={handleSubmit}>
                    <h1>Registration</h1>

                    <label>
                        <strong>Name</strong>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={30}
                        />
                    </label>

                    <label><strong>Select Instrument</strong></label>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="stock" checked readOnly />
                            Stock
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" value="crypto" disabled />
                            Crypto
                        </label>
                    </div>

                    <label>
                        <strong>Email</strong>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength={30}
                        />
                    </label>

                    <label>
                        <strong>Password</strong>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            minlength={8}
                            maxLength={30}
                        />
                    </label>

                    <label>
                        <strong>Confirm Password</strong>
                        <input
                            type="password"
                            name="confirmpassword"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            maxLength={30}
                        />
                    </label>

                    <button type="submit" className="btn-submit">Register</button>
                    <button type="button" className="btn-cancel" onClick={() => {
                        resetForm();
                         navigate("/");
                    }}>Cancel</button>
                </form>
           
        </div>
    );
}
