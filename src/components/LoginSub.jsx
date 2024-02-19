import React, { useState } from "react";
import NavDesignSub from "./NavDesignSub";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LoginSub = () => {
    // State to manage form inputs
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [users, setUsers] = useState([]);
    const [logn, setLogg] = useState(false); // State for login status
const history=[];
    // Function to handle form input changes
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
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
    
    const [log, setLog] = useState(false); // State for login status
    const handleSubmit = (e) => {
        e.preventDefault();
        window.alert(JSON.stringify(users));
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
    useEffect(() => {
        if (log) {
            window.alert("12340");
            navigate('/Update');
         // Navigate to Home page if logged in
        } else {
            localStorage.removeItem('data');
        }
    }, [log, history]);


    return (
        <>
            <NavDesignSub />
            <div className="login-container">
                <div className="leftma"></div>
                <div className="rightm">
                    <h2 style={{ color: "white" }}>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            required
                            autoComplete="username"
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            required
                            autoComplete="current-password"
                        />
                        <button type="submit">Log In</button>
                        <a href="/Forgot" className="forgot-password" style={{ color: "white" }}>
                            Forgot password?
                        </a>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginSub;
