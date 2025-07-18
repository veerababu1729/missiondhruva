import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DoctorProfile.css'; // Import CSS file for styling
import fors from "../image/lady_doctor.webp";

// Reusable section component
const InfoSection = ({ title, children }) => (
    <section className={title.toLowerCase().replace(/\s+/g, '-')}>
        <h3>{title}</h3>
        {children}
    </section>
);

const DoctorProfile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('prof');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setData(parsedData);
            console.log("Doctor name:", parsedData.name);
        }
    }, []);

    return (
        <div className="doctor-profile-container">
            {data && (
                <>
                    <div className="profile-header">
                        <img src={fors} alt="Doctor" className="profile-image" />
                        <div className="profile-title">
                            <h1>{data.name}</h1>
                            <h2>{data.title}</h2>
                        </div>
                    </div>

                    <div className="profile-details">
                        <InfoSection title="About Me">
                            <p>{data.aboutMe}</p>
                        </InfoSection>

                        <InfoSection title="Education">
                            <ul>
                                {data.education?.map((edu, index) => (
                                    <li key={index}>
                                        {edu.degree} - {edu.university}, {edu.year}
                                    </li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Certification">
                            <ul>
                                {data.certification?.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Professional Experience">
                            <ul>
                                {data.professionalExperience?.map((exp, index) => (
                                    <li key={index}>
                                        {exp.title} at {exp.hospital}, {exp.location}, {exp.dates}
                                    </li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Specializations">
                            <ul>
                                {data.specializations?.map((specialization, index) => (
                                    <li key={index}>{specialization}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Services Offered">
                            <ul>
                                {data.servicesOffered?.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Patient Testimonials">
                            <ul>
                                {data.patientTestimonials?.map((testimonial, index) => (
                                    <li key={index}>{testimonial}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Contact Information">
                            <p>
                                <span className="symbol">📌</span> <strong>Location:</strong>{' '}
                                {data.contactInformation?.location}<br />
                                <span className="symbol">☎️</span> <strong>Phone:</strong>{' '}
                                {data.contactInformation?.phone}<br />
                                <span className="symbol">✉️</span> <strong>Email:</strong>{' '}
                                <a href={`mailto:${data.contactInformation?.email}`}>
                                    {data.contactInformation?.email}
                                </a><br />
                                <span className="symbol">🌐</span> <strong>Website:</strong>{' '}
                                <a href={data.contactInformation?.website}>
                                    {data.contactInformation?.website}
                                </a>
                            </p>
                        </InfoSection>

                        <InfoSection title="Languages Spoken">
                            <ul className="column-list">
                                {data.languagesSpoken?.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Consultation Hours">
                            <p>
                                {Object.entries(data.consultationHours || {}).map(([day, time], index) => (
                                    <span key={index}>
                                        {day}: {time}<br />
                                    </span>
                                ))}
                                Emergency consultations available upon request.
                            </p>
                        </InfoSection>

                        <InfoSection title="Insurance Accepted">
                            <ul>
                                {data.insuranceAccepted?.map((insurance, index) => (
                                    <li key={index}>{insurance}</li>
                                ))}
                            </ul>
                        </InfoSection>

                        <InfoSection title="Follow Me on Social Media">
                            <ul>
                                {Object.entries(data.socialMedia || {}).map(([platform, link], index) => (
                                    <li key={index}>
                                        <a href={link}>{platform}</a>
                                    </li>
                                ))}
                            </ul>
                        </InfoSection>
                    </div>
                </>
            )}
        </div>
    );
};

InfoSection.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

DoctorProfile.propTypes = {};

export default DoctorProfile;
