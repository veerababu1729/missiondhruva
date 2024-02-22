import React, { useState, useEffect } from "react";
import NavDesign from "./NavDesign";
import "./AddNew.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const Book = () => {
  

  
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. Arun" }
  ]);

  useEffect(() => {
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
  useEffect(() => {
    window.alert(users.length+1 );
    setPatientData({
      ...patientData,
      ["number"]: users.length +1
    });
  }, [users]);

  const getUserss = async () => {
    try {
      const response = await axios.get('http://localhost:8090/patient'); // Using axios for HTTP requests
      // setUserss(response.data);
      const filteredData = response.data.filter(item => item.status === 'confirmation');
      setUserss(filteredData);
    }
    catch (error) {
      console.error(error);
    }
  }
  const sizee=users.length;
  const [patientData, setPatientData] = useState({
    name: "",
    age: "",
    mobile:"",
    aadh:"",
    gender: "",
    problem: "",
    status: "confirmation",
    number: 0,
    doctor: "",
    date:"",
    link:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientData({
      ...patientData,
      [name]: value
    });
    var siz = users.length;
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    var siz = users.length;
    // window.alert(JSON.stringify(users));
    window.alert(JSON.stringify(patientData));
    
   
    

    window.alert(JSON.stringify(patientData));
    axios.post("http://localhost:8090/patient", patientData)
      .then((response) => {
        console.log("Response:", response.data);
        window.location.reload();

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <NavDesign/>
      <div className="containerfluid ">
        <div className="row hashi">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Insert Patient Details</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
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
                      className="form-control"
                      value={patientData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      className="form-control"
                      value={patientData.mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadh">Aadhar no:</label>
                    <input
                      type="text"
                      id="aadh"
                      name="aadh"
                      className="form-control"
                      value={patientData.aadh}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      className="form-control"
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
                    <label htmlFor="link">Profile Link:</label>
                    <input
                      type="link"
                      id="link"
                      name="link"
                      className="form-control"
                      value={patientData.link}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="problem">Problem:</label>
                    <textarea
                      id="problem"
                      name="problem"
                      className="form-control"
                      value={patientData.problem}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      className="form-control"
                      value={patientData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="doctor">Doctor:</label>
                    <select
                      id="doctor"
                      name="doctor"
                      className="form-control"
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
                  <button type="submit" className="btn btn-primary">Insert</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
