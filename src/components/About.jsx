import React, { useState } from 'react';
import NavDesign from './NavDesign';
import './About.css';
import arun from '../image/arun.jpg';
import siva from '../image/siva.jpg';
import vb from '../image/vb.jpg';

function About() {
    const [hoveredName, setHoveredName] = useState(null);

    const handleMouseEnter = (name) => {
        setHoveredName(name);
    };

    const handleMouseLeave = () => {
        setHoveredName(null);
    };

    return (
        <>
            <NavDesign />
            <h1 className='onerr'>About Us </h1>
            <div className="container">
                
                <div className="image-container">
                    <div className="image-wrapper" onMouseEnter={() => handleMouseEnter('Arun')} onMouseLeave={handleMouseLeave}>
                        <img src={arun} alt="Image 1" />
                        {hoveredName === 'Arun' && <span className="name">Arun (Designer)</span>}
                    </div>
                    <div className="image-wrapper" onMouseEnter={() => handleMouseEnter('VB')} onMouseLeave={handleMouseLeave}>
                        <img src={vb} alt="Image 2" />
                        {hoveredName === 'VB' && <span className="name">VB (Architect)</span>}
                    </div>
                    <div className="image-wrapper" onMouseEnter={() => handleMouseEnter('Siva')} onMouseLeave={handleMouseLeave}>
                        <img src={siva} alt="Image 3" />
                        {hoveredName === 'Siva' && <span className="name">Siva (Developer)</span>}
                    </div>
                </div>
                <div className="about-content">
    <h2>About Us</h2>
    <p>We are three members, each with a unique mentality, united on a path to success. Together, we have successfully created this project, ensuring that the website reflects our shared vision.</p>
    <p>Our project primarily focuses on three modules:</p>
    <ul>
        <li><strong>Outpatient System:</strong> This module streamlines the process for outpatient services, providing a convenient and efficient experience for patients.</li>
        <li><strong>Hospital Portfolios:</strong> We offer comprehensive information about various hospitals, helping users make informed decisions about their healthcare options.</li>
        <li><strong>Generic vs Branded Medicine:</strong> Our platform compares generic and branded medicines, empowering individuals to choose based on both efficacy and affordability.</li>
    </ul>
    <p>Through our dedication and expertise, we aim to simplify healthcare decisions and enhance access to quality medical services for all.</p>
</div>
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form action="#" method="post">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="email" name="email" placeholder="Your Email" required />
                        <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default About;
