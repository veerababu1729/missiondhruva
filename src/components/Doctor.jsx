import React, { useEffect, useState } from 'react';
import './DoctorProfile.css'; // Import CSS file for styling
import fors from "../image/lady_doctor.webp";
const DoctorProfile = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem('prof');
        if (storedData) {
            setData(JSON.parse(storedData));
            console.log(storedData.name)
        }
    }, []);

    return (
        <div className="doctor-profile-container">
            {data && (
                <>
                    <div className="profile-header">
                        <img src={fors} alt="" className="profile-image" />
                        <div className="profile-title">
                            <h1>{data.name}</h1>
                            <h2>{data.title}</h2>
                        </div>
                    </div>
                    <div className="profile-details">
                        <section className="about-me">
                            <h3>About Me</h3>
                            <p>{data.aboutMe}</p>
                        </section>

                        <section className="education">
                            <h3>Education</h3>
                            <ul>
                                {data.education.map((edu, index) => (
                                    <li key={index}>
                                        {edu.degree} - {edu.university}, {edu.year}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="certification">
                            <h3>Certification</h3>
                            <ul>
                                {data.certification.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="professional-experience">
                            <h3>Professional Experience</h3>
                            <ul>
                                {data.professionalExperience.map((exp, index) => (
                                    <li key={index}>
                                        {exp.title} at {exp.hospital}, {exp.location}, {exp.dates}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="specializations">
                            <h3>Specializations</h3>
                            <ul>
                                {data.specializations.map((specialization, index) => (
                                    <li key={index}>{specialization}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="services-offered">
                            <h3>Services Offered</h3>
                            <ul>
                                {data.servicesOffered.map((service, index) => (
                                    <li key={index}>{service}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="patient-testimonials">
                            <h3>Patient Testimonials</h3>
                            <ul>
                                {data.patientTestimonials.map((testimonial, index) => (
                                    <li key={index}>{testimonial}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="contact-information">
                            <h3>Contact Information</h3>
                            <p>
                                <span className="symbol">📌</span> <strong>Location:</strong>{' '}
                                {data.contactInformation.location}
                                <br />
                                <span className="symbol">☎️</span> <strong>Phone:</strong>{' '}
                                {data.contactInformation.phone}
                                <br />
                                <span className="symbol">✉️</span> <strong>Email:</strong>{' '}
                                <a href={`mailto:${data.contactInformation.email}`}>
                                    {data.contactInformation.email}
                                </a>
                                <br />
                                <span className="symbol">🌐</span> <strong>Website:</strong>{' '}
                                <a href={data.contactInformation.website}>
                                    {data.contactInformation.website}
                                </a>
                            </p>
                        </section>

                        <section className="languages-spoken">
                            <h3>Languages Spoken</h3>
                            <ul className="column-list">
                                {data.languagesSpoken.map((language, index) => (
                                    <li key={index}>{language}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="consultation-hours">
                            <h3>Consultation Hours</h3>
                            <p>
                                {Object.entries(data.consultationHours).map(([day, time], index) => (
                                    <span key={index}>
                                        {day}: {time}
                                        <br />
                                    </span>
                                ))}
                                Emergency consultations available upon request.
                            </p>
                        </section>

                        <section className="insurance-accepted">
                            <h3>Insurance Accepted</h3>
                            <ul>
                                {data.insuranceAccepted.map((insurance, index) => (
                                    <li key={index}>{insurance}</li>
                                ))}
                            </ul>
                        </section>

                        <section className="social-media">
                            <h3>Follow Me on Social Media</h3>
                            <ul>
                                {Object.entries(data.socialMedia).map(([platform, link], index) => (
                                    <li key={index}>
                                        <a href={link}>{platform}</a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </>
            )}
        </div>
    );
};

export default DoctorProfile;
