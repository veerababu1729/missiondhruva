// import React, { useState } from "react";
// import NavDesignSub from "./NavDesignSub";
// import "./AddNew.css"; // Assuming you have a CSS file for styling
// import axios from "axios";
// import { useEffect } from "react";
// const AddNew = () => {
//   const [patientData, setPatientData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     condition: "",
//     status:"waiting",
//     number:""

//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData({
//       ...patientData,
//       [name]: value
//     });
//   };
//   const [users, setUserss] = useState([]);
//   useEffect(() => {
//     getUserss();
// }, []);

// const getUserss = async () => {
//     try {
//         const response = await axios.get('http://localhost:8090/patient'); // Using axios for HTTP requests
//         setUserss(response.data);
//     }
//     catch (error) {
//         console.error(error);
//     }
// }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can handle form submission here, such as sending data to the server
//     console.log("Form submitted:", patientData);
//     window.alert(JSON.stringify(users));
//     const siz=users.length;
//     window.alert(siz);
//     setPatientData({
//       name: "",
//       age: "",
//       gender: "",
//       problem: "",
//       status:"waiting",
//       number:siz+1
//     });


//     axios.post('http://localhost:8090/patient', patientData)
//       .then((response) => {
//         // Handle response from backend if needed

//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//       window.alert("Added Sucessfully")
//     // navigate("/Login");
//   };

//   return (
//     <>
//       <NavDesignSub />
//       <div className="update-container">
//         <h2>Insert Patient Details</h2>
//         <form className="update-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={patientData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age">Age:</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={patientData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select
//               id="gender"
//               name="gender"
//               value={patientData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="condition">Problem:</label>
//             <textarea
//               id="condition"
//               name="problem"
//               value={patientData.problem}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button type="submit">Insert</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddNew;


// import React, { useState, useEffect } from "react";
// import NavDesignSub from "./NavDesignSub";
// import "./AddNew.css"; // Assuming you have a CSS file for styling
// import axios from "axios";

// const AddNew = () => {
//   const [patientData, setPatientData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     problem: "",
//     status: "waiting",
//     number: "",
//     hospital: "", // Added hospital field to patientData
//     doctor: "" // Added doctor field to patientData
//   });

//   const [hospitals, setHospitals] = useState([]);
//   const [doctors, setDoctors] = useState([]);

//   useEffect(() => {
//     // Fetch hospitals and doctors from backend when component mounts
//     fetchHospitals();
//     fetchDoctors();
//   }, []);

//   const fetchHospitals = async () => {
//     try {
//       const response = await axios.get("http://localhost:8090/hospitals");
//       setHospitals(response.data);
//     } catch (error) {
//       console.error("Error fetching hospitals:", error);
//     }
//   };

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get("http://localhost:8090/doctors");
//       setDoctors(response.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData({
//       ...patientData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     window.alert("Added Successfully");
//         setPatientData({
//           name: "",
//           age: "",
//           gender: "",
//           problem: "",
//           status: "waiting",
//           number: "",
//           hospital: "",
//           doctor: ""
//         });
//     axios.post("http://localhost:8090/patient", patientData)
//       .then((response) => {
//         console.log("Response:", response.data);

//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <>
//       <NavDesignSub />
//       <div className="update-container">
//         <h2>Insert Patient Details</h2>
//         <form className="update-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={patientData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age">Age:</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={patientData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select
//               id="gender"
//               name="gender"
//               value={patientData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="problem">Problem:</label>
//             <textarea
//               id="problem"
//               name="problem"
//               value={patientData.problem}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="hospital">Hospital:</label>
//             <select
//               id="hospital"
//               name="hospital"
//               value={patientData.hospital}
//               onChange={handleChange}
//               // required
//             >
//               <option value="">Select</option>
//               {hospitals.map((hospital) => (
//                 <option key={hospital.id} value={hospital.name}>
//                   {hospital.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="doctor">Doctor:</label>
//             <select
//               id="doctor"
//               name="doctor"
//               value={patientData.doctor}
//               onChange={handleChange}
//               // required
//             >
//               <option value="">Select</option>
//               {doctors.map((doctor) => (
//                 <option key={doctor.id} value={doctor.name}>
//                   {doctor.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Insert</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddNew;

// import React, { useState, useEffect } from "react";
// import NavDesignSub from "./NavDesignSub";
// import "./AddNew.css"; // Assuming you have a CSS file for styling
// import axios from "axios";

// const AddNew = () => {
//   const [patientData, setPatientData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     problem: "",
//     status: "waiting",
//     number: "",
//     hospital: "", // No default hospital selected initially
//     doctor: "" // No default doctor selected initially
//   });

//   const [hospitals, setHospitals] = useState([
//     // Default hospital data
//     { id: 1, name: "Hospital A" }
//   ]);
//   const [doctors, setDoctors] = useState([
//     // Default doctor data
//     { id: 1, name: "Dr. John Doe" },
//     { id: 2, name: "Dr. Jane Smith" }
//   ]);

//   useEffect(() => {
//     // Fetch doctors from backend when component mounts
//     fetchDoctors();
//   }, []);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get("http://localhost:8090/doctors");
//       setDoctors(response.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };
//   const [users, setUserss] = useState([]);
//   useEffect(() => {
//     getUserss();
//   }, []);

//   const getUserss = async () => {
//     try {
//       const response = await axios.get('http://localhost:8090/patient'); // Using axios for HTTP requests
//       setUserss(response.data);
//     }
//     catch (error) {
//       console.error(error);
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPatientData({
//       ...patientData,
//       [name]: value
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     const siz = users.length;
//     window.alert(JSON.stringify(users));
//     window.alert(siz);
//     if(siz==0)
//     {
//       setPatientData({
//         name: "",
//         age: "",
//         gender: "",
//         problem: "",
//         status: "Ongoing",
//         number: "",
//         doctor: ""
//       });
//     }
//     else{
//       setPatientData({
//         name: "",
//         age: "",
//         gender: "",
//         problem: "",
//         status: "waiting",
//         number: (siz+1)+"",
//         doctor: ""
//       });
//     }
    

//     window.alert(JSON.stringify(patientData));
//     axios.post("http://localhost:8090/patient", patientData)
//       .then((response) => {
//         console.log("Response:", response.data);

//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

//   return (
//     <>
//       <NavDesignSub />
//       <div className="update-container">
//         <h2>Insert Patient Details</h2>
//         <form className="update-form" onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={patientData.name}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="age">Age:</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={patientData.age}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="gender">Gender:</label>
//             <select
//               id="gender"
//               name="gender"
//               value={patientData.gender}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="problem">Problem:</label>
//             <textarea
//               id="problem"
//               name="problem"
//               value={patientData.problem}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="hospital">Hospital:</label>
//             <select
//               id="hospital"
//               name="hospital"
//               value={patientData.hospital}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               {hospitals.map((hospital) => (
//                 <option key={hospital.id} value={hospital.name}>
//                   {hospital.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label htmlFor="doctor">Doctor:</label>
//             <select
//               id="doctor"
//               name="doctor"
//               value={patientData.doctor}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select</option>
//               {doctors.map((doctor) => (
//                 <option key={doctor.id} value={doctor.name}>
//                   {doctor.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <button type="submit">Insert</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddNew;


import React, { useState, useEffect } from "react";
import NavDesignSub from "./NavDesignSub";
import "./AddNew.css"; // Assuming you have a CSS file for styling
import axios from "axios";

const AddNew = () => {
  

  
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Doe" },
    { id: 2, name: "Dr. Jane Smith" }
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
      setUserss(response.data);
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
    status: "waiting",
    number: 0,
    doctor: ""
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
      <NavDesignSub />
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

export default AddNew;
