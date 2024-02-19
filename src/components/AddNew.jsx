import React, { useState, useEffect } from "react";
import NavDesignSub from "./NavDesignSub";
import "./AddNew.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const AddNew = () => {
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    gender: "",
    problem: "",
    status: "waiting",
    number: "",
    hospital: "", // No default hospital selected initially
    doctor: "", // No default doctor selected initially
    urgency: "normal" // Default urgency set to normal
  });

  const [hospitals, setHospitals] = useState([
    // Default hospital data
    { id: 1, name: "Hospital A" }
  ]);
  const [doctors, setDoctors] = useState([
    // Default doctor data
    { id: 1, name: "Dr. John Doe" },
    { id: 2, name: "Dr. Jane Smith" }
  ]);

  useEffect(() => {
    // Fetch doctors from backend when component mounts
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:8090/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const [users, setUserss] = useState([]);
  useEffect(() => {
    getUserss();
  }, []);

  const getUserss = async () => {
    try {
      const response = await axios.get('http://localhost:8090/patient'); // Using axios for HTTP requests
      setUserss(response.data);
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    var siz = users.length;
    window.alert(JSON.stringify(users));
    window.alert(siz);
    if(siz==0)
    {
      setPatientData({
        name: "",
        age: "",
        gender: "",
        problem: "",
        status: "Ongoing",
        number: "1",
        doctor: ""
      });

    }
    else{
      setPatientData({
        name: "",
        age: "",
        gender: "",
        problem: "",
        status: "waiting",
        number: (siz+1)+"",
        doctor: ""
      });
    }
    

    window.alert(JSON.stringify(patientData));
    axios.post("http://localhost:8090/patient", patientData)
      .then((response) => {
        console.log("Response:", response.data);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <NavDesignSub />
      <div className="update-container">
        <h2>Insert Patient Details</h2>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={patientData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={patientData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={patientData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="problem">Problem:</label>
            <textarea
              id="problem"
              name="problem"
              value={patientData.problem}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hospital">Hospital:</label>
            <select
              id="hospital"
              name="hospital"
              value={patientData.hospital}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.name}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Doctor:</label>
            <select
              id="doctor"
              name="doctor"
              value={patientData.doctor}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.name}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="urgency">Urgency:</label>
            <select
              id="urgency"
              name="urgency"
              value={patientData.urgency}
              onChange={handleChange}
              required
            >
              <option value="normal">Normal</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <button type="submit">Insert</button>
        </form>
      </div>
    </>
  );
};

export default AddNew;
