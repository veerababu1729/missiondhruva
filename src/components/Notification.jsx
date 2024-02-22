import React from "react";
import { useState, useEffect } from "react";
import NavDesign from "./NavDesignSub";
import axios from "axios";
const Notification = () => {
    const [patientData, setPatientData] = useState({
        name: "",
        age: "",
        gender: "",
        condition: "",
        status: "",
        number: "",
        doctor: ""
    });

    const [ongoingPatients, setOngoingPatients] = useState([]);
    const [waitingPatients, setWaitingPatients] = useState([]);
    const [completedPatients, setCompletedPatients] = useState([]);
    const [confirmation, setConfirmation] = useState([]);
    const [hold, sethold] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (ongoingPatients.length === 0 && waitingPatients.length > 0) {
            const nextPatient = waitingPatients[0]; // Assuming you want to take the first patient in the waiting list
            setOngoingPatients([nextPatient]);
            setWaitingPatients(waitingPatients.slice(1)); // Remove the patient from the waiting list
        }
    }, [ongoingPatients, waitingPatients]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8090/patient');
            const responseData = response.data;

            setOngoingPatients(responseData.filter(patient => patient.status === 'Ongoing'));
            setWaitingPatients(responseData.filter(patient => patient.status === 'waiting'));
            setConfirmation(responseData.filter(patient => patient.status === 'confirmation'));
            sethold(responseData.filter(patient => patient.status === 'hold'));
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };
    const handlePutOnHold = (id) => {
        const patientToPutOnHold = ongoingPatients.find(patient => patient.id === id);
        patientToPutOnHold.status = 'hold';
        axios.post(`http://localhost:8090/patientt`, patientToPutOnHold)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error putting patient on hold:', error);
                window.alert("Error putting patient on hold");
            });
    };

    

    const handleComplete = (id) => {
        const completedPatient = ongoingPatients.find(patient => patient.id === id);
        completedPatient.status = 'completed';
        axios.post(`http://localhost:8090/patientt`, completedPatient).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.error('Error updating patient status:', error);
            window.alert("Error updating patient status");
        })

    };
    const handlePut = (id) => {
        const completedPatient = confirmation.find(patient => patient.id === id);
        completedPatient.status = 'waiting';
        window.alert(JSON.stringify(completedPatient));
        axios.post(`http://localhost:8090/patientt`, completedPatient).then((response) => {
            console.log(response);
            window.location.reload();
        }).catch((error) => {
            console.error('Error updating patient status:', error);
            window.alert("Error updating patient status");
        })

    };

    const handlePatientDataChange = (e) => {
        const { name, value } = e.target;
        setPatientData({ ...patientData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8090/patients', patientData);
            const newPatient = response.data;
            if (newPatient.status === 'ongoing') {
                setOngoingPatients([...ongoingPatients, newPatient]);
            } else if (newPatient.status === 'waiting') {
                setWaitingPatients([...waitingPatients, newPatient]);
            } else if (newPatient.status === 'completed') {
                setCompletedPatients([...completedPatients, newPatient]);
            } else if (newPatient.status === 'hold') {
                sethold([...completedPatients, newPatient]);
            } else if (newPatient.status === 'confirmation') {
                setConfirmation([...completedPatients, newPatient]);
            }
        } catch (error) {
            console.error('Error adding new patient:', error);
            window.alert("Error adding new patient");
        }
    };
    return (
        <>
            <NavDesign />
            <h1 className="onerr">Update Page</h1>
            <div className="ucontainer"></div>
            <div className="lpatients-list">
                <h2>Ongoing Patients</h2>
                <ul>

                    {confirmation.length > 0 && (
                        <ul>
                            {confirmation.map(patient => (
                                <li key={patient.id}>
                                    <span>Name: {patient.name}</span>
                                    <span>Age: {patient.age}</span>
                                    <span>Gender: {patient.gender}</span>
                                    <span>Number: {patient.number}</span>
                                    <span>Date: {patient.date}</span>
                                    <span>Profile Link: {patient.link}</span>
                                    {patient.status === 'confirmation' && <div>Status: Give Confirmation</div>}
                                    <button onClick={() => handlePut(patient.id)}>Send to waiting</button>
                                </li>
                            ))}
                        </ul>
                    )}

                </ul>
            </div>

        </>
    )
}
export default Notification;