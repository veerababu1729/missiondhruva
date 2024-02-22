import React, { useEffect, useState } from "react";
import NavDesign from "./NavDesign";
import './Port.css';
import axios from "axios";
import DoctorProfile from "./Doctor";
import { useNavigate } from "react-router-dom";

import fors from '../image/lady_doctor.webp';
const Port = () => {
    const navigate = useNavigate();
    const [selectedHospital, setSelectedHospital] = useState(null);

    useEffect(() => {
        const storedHospital = localStorage.getItem('selectedHospital');
        if (storedHospital) {
            setSelectedHospital(JSON.parse(storedHospital));
        }
    }, []);

    const [dct, setDcts] = useState([]);

    useEffect(() => {
        getDcts();
    }, []);

    const getDcts = async () => {
        try {
            const response = await axios.get('http://localhost:8090/dct'); // Using axios for HTTP requests
            setDcts(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDoctorClick = (d) => {
        localStorage.setItem("prof", JSON.stringify(d));
        // console.log(JSON.stringify(d));
        navigate('/Doctors')

    }
    return (
        <div className="port-container">
            <NavDesign />
            <div className="port-content">
                {selectedHospital && (
                    <div className="hospital-details">
                        <h1 className="hospital-name">{selectedHospital.Name}</h1>
                        <p className="hospital-location">{selectedHospital.Location}</p>

                        <img className="main-image" src={selectedHospital.Main_Image} alt="Main" />
                    </div>
                )}
                <h2>Doctors</h2>
                {dct.map((doctor) => (
                    <div className="doctor-profile" key={doctor.id} onClick={() => handleDoctorClick(doctor)}>
                        <img src={fors} alt={doctor.name} className="doctor-image" />
                        <div className="doctor-details">
                            <h3>{doctor.name}</h3>
                            <p>{doctor.specialization}</p>
                        </div>
                    </div>
                ))}


                {selectedHospital && (
                    <div className="equipments">
                        <h2>Equipments</h2>
                        <div className="equipment-list">
                            {[selectedHospital.Equipment1, selectedHospital.Equipment2, selectedHospital.Equipment3].map((equipment, index) => (
                                <img key={index} className="equipment-image" src={equipment} alt={`Equipment ${index + 1}`} />
                            ))}
                        </div>
                    </div>
                )}


                {selectedHospital && (
                    <div className="treatments">
                        <h2>Treatments & Expenditure</h2>
                        <table className="treatments-table">
                            <thead>
                                <tr>
                                    <th>Disease</th>
                                    <th>Description</th>
                                    <th>Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedHospital.Table_data.map((treatment, index) => (
                                    <tr key={index}>
                                        <td>{treatment.Disease}</td>
                                        <td>{treatment.Description}</td>
                                        <td>{treatment.Cost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                {selectedHospital && (
                    <div>
                        <div className="treatments">
                            <h2>General Test Costs</h2>
                            <table className="treatments-table">
                                <thead>
                                    <tr>
                                        <th>Test</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedHospital.TandC.map((test, index) => (
                                        <tr key={index}>
                                            <td>{test.Test}</td>
                                            <td>{test.Cost}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </div>
                )}

            </div>

        </div>
    );
};

export default Port;
