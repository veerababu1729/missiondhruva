import React, { useEffect, useState } from "react";
import NavDesign from "./NavDesign";
import './Hports.css';
import Gallery from '../image/Gallery.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hport = () => {
    const navigate = useNavigate();
    const [da, setda] = useState("false");
    const [selectedHospital, setSelectedHospital] = useState(null); // To store selected hospital data

    const handleData = (hospitalData) => {
        // Store selected hospital data in local storage
        localStorage.setItem('selectedHospital', JSON.stringify(hospitalData));
        navigate("/port");
    }

    useEffect(() => {
        setda('false');
    }, [])

    useEffect(() => {
        getUsers();
    }, []);

    const [info, setUsers] = useState([]);

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8090/info'); // Using axios for HTTP requests
            setUsers(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <NavDesign />

            <div className="hmain">
                <div className="imag"> <img src={Gallery} alt="gallery image" /></div>
            </div>
            <h1 className="onerr" >Hospital Portfolios</h1>
            <div className="Mainp">
                {info.map((hospital, index) => (
                    <div className="boxin" key={index}>
                        <div className="boximg"><img src={hospital.Main_Image} alt="desc" /></div>
                        <div className="Desc">
                            <h3>Name: {hospital.Name}</h3>
                            <div>
                                <p>Location: {hospital.Location}</p>
                            </div>
                            <div className="butt" id="butt2" onClick={() => handleData(hospital)}> View</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Hport;
