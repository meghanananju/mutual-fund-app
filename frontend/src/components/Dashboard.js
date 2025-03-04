import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [fundFamilies, setFundFamilies] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState("");
    const [funds, setFunds] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchFundFamilies(token);
        }
    }, []);

    const fetchFundFamilies = async (token) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/funds/fetchFundFamilies`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFundFamilies(res.data.fundFamilies);
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => setError(""), 2000);
        }
    };

    const fetchFunds = async (token, fundFamily) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/funds/fetchFunds`,
                { fundFamily },
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            setFunds(res.data.funds);
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => setError(""), 2000);
        }
    };

    const handleFundFamilyChange = (event) => {
        const selected = event.target.value;
        setSelectedFamily(selected);
        if (selected) {
            const token = localStorage.getItem("token");
            fetchFunds(token, selected);
        }
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const id = localStorage.getItem("id");
            await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/logout`,
                { id, token },
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            localStorage.removeItem("token");
            localStorage.removeItem("id");
          
                navigate("/login");
       
        } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => setError(""), 2000);
        }
    };

    return (
<div className="dashboard-container">
<h2>Dashboard</h2>
{error && <p className="error">{error}</p>}
{successMessage && <p className="success">{successMessage}</p>}

<div className="dashboard-controls">
    <label>Select Fund Family:</label>
    <select value={selectedFamily} onChange={handleFundFamilyChange}>
        <option value="">Select a fund family</option>
        {fundFamilies.map((family, index) => (
            <option key={index} value={family}>
                {family}
            </option>
        ))}
    </select>
</div>

{/* Scrollable Table Container */}
<div className="table-container">
    <table>
        <thead>
            <tr>
                <th>Scheme Code</th>
                <th>Scheme Name</th>
                <th>Net Asset Value (₹)</th>
                <th>Date</th>
                <th>Scheme Type</th>
                <th>Scheme Category</th>
            </tr>
        </thead>
        <tbody>
            {funds.map((fund, index) => (
                <tr key={index}>
                    <td>{fund.Scheme_Code}</td>
                    <td>{fund.Scheme_Name}</td>
                    <td>{fund.Net_Asset_Value}</td>
                    <td>{fund.Date}</td>
                    <td>{fund.Scheme_Type}</td>
                    <td>{fund.Scheme_Category}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

<div className="logout-button">
    <button onClick={handleLogout}>Logout</button>
</div>
</div>
);
};

export default Dashboard;
