import React, { useState } from "react";
import axios from "axios";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        // Validate email format
        if (!email.endsWith("@gmail.com")) {
            setError("Email must be a Gmail address (e.g., example@gmail.com)");
            setTimeout(() => setError(""), 2000);
            return; // Stop execution if validation fails
        }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/signup`,
                { email, password }
            );


            setSuccessMessage(response.data.message);

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.replace('/login');
            }, 3000);

        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || "Signup failed");
            } else {
                setError("Signup failed");
            }

            // Clear error after 2 seconds
            setTimeout(() => {
                setError("");
            }, 2000);
        }
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
                <div className="password-container">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                    </span>
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
