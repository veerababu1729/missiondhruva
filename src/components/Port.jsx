import React, { useEffect, useState } from "react";
import NavDesign from "./NavDesign";
import './Port.css';

const Port = () => {
    const [selectedHospital, setSelectedHospital] = useState(null);

    useEffect(() => {
        const storedHospital = localStorage.getItem('selectedHospital');
        if (storedHospital) {
            setSelectedHospital(JSON.parse(storedHospital));
        }
    }, []);
    return (
        <div className="port-container">
            <NavDesign />
            <div className="port-content">
                {selectedHospital && (
                    <div className="hospital-details">
                        <h1 className="hospital-name">{selectedHospital.Name}</h1>
                        <p className="hospital-location">{selectedHospital.Location}</p>
                        <div className="about-hospital">
                            <h2>About</h2>
                            {/* <img className="hospital-image" src={selectedHospital.About} alt="Hospital" /> */}
                        </div>
                        <img className="main-image" src={selectedHospital.Main_Image} alt="Main" />
                    </div>
                )}

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
            </div>
        </div>
    );
};

export default Port;
