import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavDesignSub from "./NavDesignSub";
import "./Update.css"; // Assuming you have a CSS file for styling

const Update = () => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(intervalId);
  }, []);
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
      setCompletedPatients(responseData.filter(patient => patient.status === 'completed'));
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
    const completedPatient = hold.find(patient => patient.id === id);
    completedPatient.status = 'waiting';
    // window.alert(JSON.stringify(completedPatient));
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
      }
    } catch (error) {
      console.error('Error adding new patient:', error);
      window.alert("Error adding new patient");
    }
  };

  return (
    <>
      <NavDesignSub />
      <h1 className="onerr">Update Page</h1>
      <div className="ucontainer">
        <div className="lpatients-list">
          <h2>Ongoing Patients</h2>
          <ul>
            {ongoingPatients.map(patient => (
              <li key={patient.id}>
                <span>Name: {patient.name}</span>
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <span>Problem: {patient.problem}</span>
                <span>Number: {patient.number}</span>
                {patient.status === 'hold' && <div>Status: Hold</div>}
                <button onClick={() => handleComplete(patient.id)}>Complete</button>
                <button onClick={() => handlePutOnHold(patient.id)}>Put on Hold</button> {/* Add this button */}
              </li>
            ))}
            {hold.map(patient => (
              <li key={patient.id}>
                <span>Name: {patient.name}</span>
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <span>Problem: {patient.problem}</span>
                <span>Number: {patient.number}</span>
                {patient.status === 'hold' && <div>Status: Hold</div>}
                <button onClick={() => handlePut(patient.id)}>Send to waiting</button>
              </li>
            ))}
          </ul>
        </div>
        

        <div className="lpatients-list">
          <h2>Waiting Patients</h2>
          <ul>
            {waitingPatients.map(patient => (
              <li key={patient.id}>
                <span>Name: {patient.name}</span>
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <span>Problem: {patient.problem}</span>
                <span>Number: {patient.number}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lpatients-list">
          <h2>Completed Patients</h2>
          <ul>
            {completedPatients.map(patient => (
              <li key={patient.id}>
                <span>Name: {patient.name}</span>
                <span>Age: {patient.age}</span>
                <span>Gender: {patient.gender}</span>
                <button disabled>Completed</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Update;
