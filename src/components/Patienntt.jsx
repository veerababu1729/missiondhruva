import React, { useState } from "react";
import axios from "axios";
import NavDesign from "./NavDesign";
import { useEffect } from "react";
import down from '../image/download.png';
import './patient.css';
import { useNavigate } from "react-router-dom";

const Patient = () => {
    const navigate=useNavigate
    const [data, getdata] = useState([]);

    useEffect(() => {
        getss();
    }, []);
    const healthRecords = [
        { date: '2024-02-22', disease: 'Flu', treatment: 'Rest and fluids' },
        { date: '2024-01-15', disease: 'Headache', treatment: 'Painkillers' },
        // Add more records as needed
    ];

    const [upcomingAppointments, setup] = useState([
        { date: '2024-02-25', time: '10:00 AM', doctor: 'Dr. Smith', location: '123 Main St', sessionId: '123456' },
        { date: '2024-03-02', time: '2:30 PM', doctor: 'Dr. Johnson', location: '456 Elm St', sessionId: '789012' },
        // Add more appointments as needed
    ]);

    const addocs = () => {
        const newdocs = {
            date: prompt('Enter date (YYYY-MM-DD)'),
            time: prompt('Enetr The Description'),
            download: prompt('Upload the file link here')
        };
        setdocs([...healthRecords, newdocs]);
    };
    const [docs, setdocs] = useState([
        { date: '2024-02-22', desciption: "some thing enered", link: "enered link" },
        { date: '2024-01-15', desciption: "some thing enered", link: "enered link" },
        // Add more records as needed
    ]);

    const [docss, setdocss] = useState([]);

    useEffect(() => {
        getdocs();
    }, []);
    

    const getss = async () => {
        try {
            const response = await axios.get('http://localhost:8090/Patient');
            const responseData = response.data;

            const aadhar = localStorage.getItem('aadhar');
            const filteredData = responseData.filter(patient => patient.aadh === aadhar);
            getdata(filteredData);
        } catch (error) {
            console.error(error);
        }
    };
    const getdocs = async () => {
        try {
            const response = await axios.get('http://localhost:8090/Docs');
            const responseData = response.data;
            setdocss(responseData);
        } catch (error) {
            console.error(error);
        }
    };
    const handleJoinSession = (sessionId) => {
        // Handle joining session logic here, e.g., redirect to a video call page
        window.alert('Joining session with sessionId:', sessionId);
    };
    const handleDownload = () => {
        // Replace 'your-pdf-file.pdf' with the actual URL of your PDF file
        window.location.href = 'https://s2.q4cdn.com/170666959/files/Blank.pdf';
        window.alert("downloaded")
    };
    const filename="generation.pdf"
    const handleDownloadd = (record) => {
        try {
            const dataURL = `data:text/plain;base64,${btoa(record.fileContent)}`; // Assuming fileContent contains the file data
            const link = document.createElement('a');
            link.href = dataURL;
            link.setAttribute('download', "record.pdf"); // Set the file name for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <>
            <NavDesign />
            {data.length > 0 && (
                <div className="container-fluid">
                    <div className="row psad">
                        <div className="col-md-4 snm ">
                            <img src={down} alt="Patient" className="img-fluid" />
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">Patient Details</div>
                                <div className="card-body">
                                    <ul className="list-groupi">
                                        <li className="list-group-itemi">
                                            <strong>Name:</strong> {data[0].name}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Age:</strong> {data[0].age}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Mobile:</strong> {data[0].mobi}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Aadhar no:</strong> {data[0].aadh}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Gender:</strong> {data[0].gender}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Alergies & Senstives:</strong> {data[0].problem}
                                        </li>
                                        <li className="list-group-itemi">
                                            <strong>Genetic Disease History:</strong> {"No"}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">

                        <div className="card md-4">
                            <div className="row psad">

                                <div className="col-md-8">
                                    <div className="card-header">Past Health Records</div>


                                    <ul className="list-group">
                                        {docss
                                            .filter(record => record.type === "healthrecord")
                                            .map((record, index) => (
                                                <li key={index} className="list-group-item">
                                                    <div><strong>{record.date}</strong></div>
                                                    {/* <div>{record.disease}</div> */}
                                                    <div>Treatment: {record.desc}</div>
                                                    <button className="btn btn-primary" onClick={() => handleDownloadd(record)} >Download</button>
                                                </li>
                                            ))
                                        }
                                    </ul>

                                </div>
                                <div className="col-md-4">
                                    <div className="card-header">Upcoming Appointments</div>
                                    <ul className="list-group list-group-flush">
                                        {upcomingAppointments.map((appointment, index) => (
                                            <li key={index} className="list-group-item">
                                                <div>Date: {appointment.date} {appointment.time}</div>
                                                <div>Doctor: {appointment.doctor}</div>
                                                <button className="btn btn-primary" onClick={() => handleJoinSession(appointment.sessionId)}>Join Session</button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                            </div>

                        </div>

                    </div>
                    <div className="row">
                        <div className="card">


                            <div className="col-md-12">
                                <div className="card-header">My Docs</div>


                                <ul className="list-group">
                                    {docss
                                        .filter(record => record.type === "personalDocs")
                                        .map((record, index) => (
                                            <li key={index} className="list-group-item">
                                                <div><strong>{record.date}</strong></div>
                                                {/* <div>{record.disease}</div> */}
                                                <div>Treatment: {record.desc}</div>
                                                <button className="btn btn-primary" onClick={handleDownloadd}>Download</button>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <a href="/insr"><button className="onere">Add Own Personal</button></a> 

                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

export default Patient;
