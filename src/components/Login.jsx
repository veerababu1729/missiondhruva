import React, { useState, useEffect } from "react";
import { useHistory, useNavigate } from "react-router-dom"; // Import useHistory for navigation
import NavDesign from "./NavDesign"; // Assuming this component exists and renders your navigation bar
import './Login.css';
import axios from 'axios'; // Import axios for making HTTP requests

const Login = () => {
    const navigate=useNavigate();
    const history = []; // Initialize useHistory
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [users, setUsers] = useState([]);
    const [log, setLog] = useState(false); // State for login status

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8090/loggn'); // Using axios for HTTP requests
            setUsers(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(users));
        const user = users.find((user) => user.username === formData.username && user.Password === formData.password);
        window.alert(JSON.stringify(user));
        if (!user) {
            window.alert("User not found");
            setLog(false);
            localStorage.removeItem('isLoggedIn'); // Remove login status
            localStorage.removeItem('userData'); // Remove user data
        } else {
            localStorage.setItem('isLoggedIn', true); // Set login status to true
            localStorage.setItem('userData', JSON.stringify(user)); // Save user data
            setLog(true);
        }
    }
    

    const handleRegister = (e) => {
        navigate('/Register'); // Navigate to Register page
    }

    useEffect(() => {
        if (log) {
            window.alert("12340");
            navigate('/');
         // Navigate to Home page if logged in
        } else {
            localStorage.removeItem('data');
        }
    }, [log, history]);

    return (
        <>
            <NavDesign />
            <div className="login-container">
                <div className="leftma">
                </div>
                <div className="rightm">
                    <h2 style={{ color: "white" }}>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <button type="submit">Log In</button>
                        <a href="/Forgot" className="forgot-password" style={{ color: "white" }}>
                            Forgot password? 
                        </a>
                        <button type="submit" onClick={handleRegister}>Register</button>
                        <a href="/LoginSub" className="forgot-password" style={{ color: "white" }}>
                            SubAdmin Login
                        </a>
                    </form>
                     {/* Register button */}
                </div>
            </div>
        </>
    );
};

export default Login;
