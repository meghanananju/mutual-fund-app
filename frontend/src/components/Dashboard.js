import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [funds, setFunds] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            fetchFunds(token);
        }
    }, []);

    const fetchFunds = async (token) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/funds/fetchFunds`, {
                headers: { Authorization: token },
            });
            setFunds(res.data.funds);
        } catch (error) {
            alert("Error fetching funds");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>Mutual Funds</h3>
            <ul>
                {funds.map((fund, index) => (
                    <li key={index}>
                        {fund.schemeName} - ₹{fund.currentValue}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
