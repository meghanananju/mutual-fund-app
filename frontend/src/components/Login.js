import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("id", res.data.id)
            setSuccessMessage("Login successful...")
            // Clear success message after 1 seconds
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
            navigate("/dashboard");

        } catch (error) {
            if (error.response.message) {
                setError(error.response.message);

                // Clear error message after 2 seconds
                setTimeout(() => {
                    setError('');
                }, 2000);
            } else {
                setError("Invalid credentials");
                setTimeout(() => {
                    setError('');
                }, 2000);
            }
        };
    };
    return (
        <div className="login-container">
            <h2>Mutual Funds App</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        // type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        // type="text"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                    <button onClick={() => window.location.replace('/signup')}>signup</button>
                </div>
            </form>
        </div>
    );
};


export default Login;