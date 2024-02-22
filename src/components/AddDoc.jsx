import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddDoc= () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        date: '',
        desc: '',
        file: "",
        recordType: '' // New state for record type
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        window.alert(file.name);
        setFormData({ ...formData, file: file.name }); // Extract file name
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        axios.post('http://localhost:8090/Docs', formData)
            .then((response) => {
                // Handle response from backend if needed
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            navigate("/insr");
        // try {
        //     const formDataToSend = new FormData();
        //     formDataToSend.append('name', formData.name);
        //     formDataToSend.append('email', formData.email);
        //     formDataToSend.append('file', formData.file);

        //     const response = await fetch('/api/personal', {
        //         method: 'POST',
        //         body: formDataToSend
        //     });

        //     if (response.ok) {
        //         console.log('Form submitted successfully');
        //     } else {
        //         console.error('Error submitting form:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Network error:', error.message);
        // }
    };

    return (
        <div className="container mt-5">
            <h2>Add Document</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="date" className="form-label">Date:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="text" className="form-label">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="desc"
                        name="desc"
                        value={formData.desc}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="recordType" className="form-label">Record Type:</label>
                    <select
                        className="form-control"
                        id="recordType"
                        name="recordType"
                        value={formData.recordType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Record Type</option>
                        <option value="healthrecord">Health Records</option>
                        <option value="personalDocs">Personal Records</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};
export default AddDoc;
