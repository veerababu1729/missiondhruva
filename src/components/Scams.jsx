import React from "react";
import "./Scams.css"; // Import CSS file for styling
import NavDesign from "./NavDesign";

const Scams = (props) => {
  return (
    <>
    <NavDesign/>
    <div className="scams-container">
      <h1 className="scams-heading">Generic VS Branded</h1>
      <div className="scams-content">
        <div className="scam-point">
          <h2 className="scam-point-heading">Overpriced Branded Medicine</h2>
          <p>Doctors often prescribe branded medicines that are 80% more costly than generic ones due to collaboration with pharmacy companies.</p>
          <p>These collaborations lead to claims that "Generic won't work effectively and only this medicine works", resulting in higher profits.</p>
          <p>Generic medicines are often as effective as branded ones, containing the same molecular formula.</p>
        </div>
        <div className="scam-point">
          <h2 className="scam-point-heading">Patent Rights and Generic Medicines</h2>
          <p>Pharmacy companies have 20 years of patent rights, after which their medicines become generic, leading to decreased prices.</p>
          <p>Despite passing all tests and having the same molecular formula, branded medicines remain unregulated in cost.</p>
        </div>
        <div className="scam-point">
          <h2 className="scam-point-heading">Internal Scams in Generic Medicines</h2>
          <p>Generic medicines often have inflated prices by 50% - 80% of the MRP, contributing to seller profits.</p>
          <p>Rumors like "Generic medicines won't work efficiently" are spread by pharmacy companies to maintain their business.</p>
        </div>
        <div className="scam-point">
          <h2 className="scam-point-heading">Government Initiatives</h2>
          <p>The Indian government has launched "Jan Aushadhi," with 5000 generic medical shops, providing affordable healthcare.</p>
        </div>
        <div className="scam-point">
          <h2 className="scam-point-heading">Example</h2>
          <p>Metformin, a generic diabetes drug, costs 40 rupees per box of 10 tablets, while the branded Glucophage costs 179 rupees, showing a 77.65% price difference.</p>
        </div>
        <div className="scam-point">
          <h2 className="scam-point-heading">Availability of Brands</h2>
          <p>More than 10,000 brands of drugs are available in India, leading to a wide variation in prices.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Scams;
