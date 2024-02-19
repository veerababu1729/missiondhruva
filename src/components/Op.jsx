// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import Opback from '../image/op_back.jpg';
// import NavDesign from "./NavDesign";
// import "./Op.css";

// const Op = (props) => {
//   const [patients, setPatients] = useState([]);
//   const [doctorName, setDoctorName] = useState("Arun");



//   useEffect(() => {
//     fetchData();
//   }, []);
//   const [ongoingPatients, setOngoingPatients] = useState([]);
//   const [waitingPatients, setWaitingPatients] = useState([]);
//   const [completedPatients, setCompletedPatients] = useState([]);


//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:8090/patient');
//       const responseData = response.data;

//       setOngoingPatients(responseData.filter(patient => patient.status === 'Ongoing'));
//       setWaitingPatients(responseData.filter(patient => patient.status === 'waiting'));
//       setCompletedPatients(responseData.filter(patient => patient.status === 'completed'));
//     } catch (error) {
//       console.error('Error fetching patient data:', error);
//     }
//   };

//   return (
//     <>
//       <NavDesign />
//       <div className="mainn">
//         <div className="main1">
//           <img src={Opback} alt="logo" />
//           <div className="overlay">
//             <h1 className="overlay-text">Welcome to Our Clinic</h1>
//           </div>
//         </div>
//         <div className="main2">
//           <h1 className="header">Now Checking</h1>
//           <div className="appointment-info">
//             <div className="appointment-item">
//               <h2>Patient Checked In</h2>
//               <div className="number blinking">{patients.length}</div>
//             </div>
//             <div className="appointment-item">
//               <h2>Next Patient</h2>
//               <div className="next-patient">{patients.length > 0 ? patients[0] : "No patients"}</div>
//             </div>
//           </div>
//           <div className="patient-info">
//             <div className="doctor-info">
//               <h2>Doctor Name:</h2>
//               <p>{doctorName}</p>
//               <ul>
//                 <li>Specialist</li>
//               </ul>
//             </div>
//           </div>
//           <div className="outpatient-list">
//             <h2>Outpatient List</h2>
//             <ol>
//               {patients.map((patient, index) => (
//                 <li key={index}>{patient}</li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Op;


import React, { useState, useEffect } from "react";
import axios from 'axios';
import Opback from '../image/op_back.jpg';
import NavDesign from "./NavDesign";
import "./Op.css";

const Op = (props) => {
  const [ongoingPatients, setOngoingPatients] = useState([]);
  const [waitingPatients, setWaitingPatients] = useState([]);
  const [completedPatients, setCompletedPatients] = useState([]);

  const [emergencyPatients, setEmergencyPatients] = useState([]);
  const [doctorName, setDoctorName] = useState("Arun");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/patient');
      const responseData = response.data;

      setOngoingPatients(responseData.filter(patient => patient.status === 'Ongoing'));
      setWaitingPatients(responseData.filter(patient => patient.status === 'waiting'));
      setCompletedPatients(responseData.filter(patient => patient.status === 'completed'));
      setEmergencyPatients(responseData.filter(patient => (patient.urgency === 'emergency') && (patient.status === 'waiting')));

      window.alert(JSON.stringify(emergencyPatients));
      // window.alert(JSON.stringify(waitingPatients));
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  return (
    <>
      <NavDesign />
      <div className="mainn">
        <div className="main1">
          <img src={Opback} alt="logo" />
          <div className="overlay">
            <h1 className="overlay-text">Welcome to Our Clinic</h1>
          </div>
        </div>
        <div className="main2">
          <h1 className="header">Now Checking</h1>
          <div className="appointment-info">
            <div className="appointment-item">
              <h2>Ongoing Patients</h2>
              <div className="number blinking">{waitingPatients.length > 0 ? waitingPatients[0].number : "No patients"}</div>
            </div>
            <div className="appointment-item">
              <h2>Next Patient</h2>
              <div className="next-patient">{waitingPatients.length > 1 ? waitingPatients[1].name : "No patients"}</div>
            </div>
          </div>
          <div className="patient-info">
            <div className="doctor-info">
              <h2>Doctor Name:</h2>
              <p>{doctorName}</p>
              <ul>
                <li>Cardioligist</li>
              </ul>
            </div>
          </div>
          <div className="emergency-list"> {/* Apply styles from external CSS */}
            <h2>Emergency List</h2>
            <ul>
              {emergencyPatients.length > 0 ? (
                <ul>
                  {emergencyPatients.map((patient, index) => (
                    <li key={index + 1}>
                      <ul className="list-bar">
                        <li>
                          {patient.name}
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <li>No patients</li>
              )}

            </ul>
          </div>
          <div className="patient-list"> {/* Apply styles from external CSS */}
            <h2>Outpatient List</h2>
            <ul>
              {waitingPatients.length > 1 ? (
                waitingPatients.map((patient, index) => (
                  <li key={index + 1}>
                  <ul className="list-bar">
                    <li>
                      {patient.name}
                    </li>
                  </ul>
                </li>
                ))
              ) : (
                <li>No patients</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Op;
