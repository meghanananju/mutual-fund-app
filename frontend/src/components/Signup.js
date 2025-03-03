import React, { useState } from "react";
import axios from "axios";


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, { email, password });
            setSuccessMessage("Signup successful! Please login.");
            navigate("/login");
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        } catch (error) {
            if (error.response.message) {
                setError(error.response.message);

                // Clear error message after 2 seconds
                setTimeout(() => {
                    setError('');
                }, 2000);
            } else {
                setError("Signup failed");
                setTimeout(() => {
                    setError('');
                }, 2000);
            };
        };
    };

    return (
        <div className="signup-container">
            <h2>Signup</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input

                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input

                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form">
                    <button type="submit">signup</button>
                    <button type="back" onClick={() => window.location.replace('/login')}>Back</button>
                </div>
            </form>
        </div >
    );
};

export default Signup;
