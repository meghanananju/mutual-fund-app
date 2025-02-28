import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h2>Welcome to Mutual Fund App</h2>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>Signup</button></Link>
        </div>
    );
};

export default Home;
