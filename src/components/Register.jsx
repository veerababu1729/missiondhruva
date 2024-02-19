import React from "react";
import NavDesign from "./NavDesign"; // Assuming this component exists and renders your navigation bar
import './Register.css';
import axios from 'axios';
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const Register = () => {
    const navigate=useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [usepwd, setUsePwd] = useState(''); // Assuming this state is defined somewhere


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    const handleLogin = (e) => {
        e.preventDefault();
        window.alert(JSON.stringify(userData));
        if (userData.password !== usepwd) {
            alert("Passwords don't match!");
            return;
        }
        if (!userData.username!='' || !userData.password!='' || !userData.email!='') {
            // console.error('One or more fields are empty. Please fill in all required fields.');
            window.alert("empty detected");
            return; // Exit the function if any field is empty
        }

        axios.post('http://localhost:8090/loggn', userData)
            .then((response) => {
                // Handle response from backend if needed
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            navigate("/Login");
    };
    return (
        
        <>
            <NavDesign />
            <div className="login-container">
                <div className="leftma">
                    {/* Add content or design elements for the left section as needed */}
                    {/* <h2>Welcome!</h2>
                    <p>Please enter your credentials to log in.</p> */}
                </div>
                <div className="rightm">
                    <h2 style={{color:"white"}}> User Registration</h2>
                    <form className="login-form" onSubmit={handleLogin}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="usernamee"
                            name="username"
                            placeholder="Enter your username"
                            value={userData.username}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={userData.email}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="passworde"
                            name="password"
                            placeholder="Enter your password"
                            value={userData.password}
                            onChange={handleChange}
                            required
                            
                        />
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Re-enter your password"
                            value={usepwd}
                            onChange={(e) => setUsePwd(e.target.value)}
                            required
                            
                        />
                        <button type="submit">Sign Up</button>
                        <a href="/Login" className="forgot-password" style={{ color: "white" }}>
                            Already Have Account ?
                        </a>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;