import React, { useState } from 'react';
import NavDesign from './NavDesign';
import './Branded.css';
import axios from 'axios';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills, faSyringe, faCapsules } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function MyVerticallyCenteredModal({ data, ...props }) {
  // Calculate total saving
  const totalSaving = data.reduce((acc, item) => acc + (item.Bcost - item.Gcost), 0);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{ textAlign: 'center', fontSize: '24px', color: '#333', fontWeight: 'bold', alignItems: 'center' }}>
          You Can Save Up to
          <span className="saving-amount">Rs.{totalSaving}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: 'center', fontSize: '18px', color: '#333', alignItems: 'center' }}>
        <table style={{ margin: 'auto', borderSpacing: '10px' }}>
          <tbody style={{ width: '70%' }}>
            {/* Display total generic cost and total branded cost at the top */}
            <tr>
              <td colSpan="2" style={{ padding: '10px', textAlign: 'left', borderBottom: '3px solid #ccc' }}>
                <strong>Total Branded Cost: </strong> Rs.{data.reduce((acc, item) => acc + +item.Bcost, 0)}
              </td>
            </tr>
            <tr>
              <td colSpan="2" style={{ padding: '10px', textAlign: 'left', borderBottom: '3px solid #ccc' }}>
                <strong>Total Generic Cost:</strong> Rs.{data.reduce((acc, item) => acc + +item.Gcost, 0)}
              </td>
            </tr>

            {/* Display individual item details and differences */}
            {data.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '10px', textAlign: 'left', width: '70%' }}>
                  <div style={{ marginBottom: '5px' }}>
                    <strong>Branded Cost:  {item.Branded}</strong> Rs.{item.Bcost}
                  </div>
                  <div>
                    <strong>Generic Cost:  {item.Generic}</strong> Rs.{item.Gcost}
                  </div>
                </td>
                <td style={{ padding: '10px', textAlign: 'left', width: '50%' }}>
                  <strong>Difference:</strong> Rs.{item.Bcost - item.Gcost}
                </td>
              </tr>
            ))}
          </tbody>






        </table>
      </Modal.Body>




      <Modal.Footer style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <FontAwesomeIcon icon={faPills} className="medical-icon" size="4x" style={{ color: "#51C0FF" }} />
        </div>
        <div>
          <FontAwesomeIcon icon={faSyringe} className="medical-icon" size="4x" style={{ color: '#51C0FF' }} />
        </div>
        <div>
          <FontAwesomeIcon icon={faCapsules} className="medical-icon" size="4x" style={{ color: '#51C0FF' }} />
        </div>
        <div>
          <FontAwesomeIcon icon={faCapsules} className="medical-icon" size="4x" style={{ color: '#51C0FF' }} />
        </div>
        <div>
          <Button onClick={props.onHide}>Close</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}



function Branded() {
  const navigate=useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('paracetamol');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptMessage, setPromptMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const predefinedData = ['Paracetamol', 'Ibuprofen', 'Aspirin', 'Lisinopril', 'Metformin', 'Simvastatin']; // Predefined data for prediction
  const [modalShow, setModalShow] = React.useState(false);
  const getdata = async () => {
    try {
      const response = await axios.get('http://localhost:8090/Medcine');
      const modifiedData = response.data.map(item => ({
        ...item,
        isSelected: false
      }));
      setdataa(modifiedData);
      setda(modifiedData);
      console.log(dataa);
    } catch (error) {
      console.error(error);
    }
  };
  const [sear, setSearch] = useState([]);
  const handleSearch = () => {
    const filteredResults = dat.filter(item =>
      item.Branded.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(filteredResults);
    console.log(sear);
  };

  const handleCheckboxChange = (_id) => {
    const selectedItem = dataa.find(item => item._id === _id);


    selectedItem.isSelected = !selectedItem.isSelected;
    setdataa(prevData => prevData.map(item => (item._id === _id ? selectedItem : item)));

  };

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };
  const handleCompareButtonClick = () => {
    // Filter the data based on the status being true

    const filteredData = dataa.filter(item => item.isSelected);

    window.alert(JSON.stringify(filteredData));
    setModalShow(true);
    setSelectedItems(filteredData);

  };



  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
  };
  const [dataa, setdataa] = useState([]);
  const [dat, setda] = useState([]);

  useEffect(() => {
    getdata();

  }, []);
  const handlenav=(e)=>{
    navigate('/Scams');
  }





  return (
    <>
      <NavDesign />
      <div className='inside'>

        <div className="search-container">
          
          <div className='searc'>
            
            <div className="search-inner">
              <input type="text" value={value} className='inputt' onChange={onChange} placeholder="Search for medicines..." />
              <button onClick={handleSearch} >Search</button>
            </div>
            <div className="dropdown">
              {dat.filter((item) => {
                const searchTerm = value;
                const fullName = item.Branded;
                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm
                );
              })
                .slice(0, 5)
                .map((item) => (
                  <div
                    onClick={() => onSearch(item.Branded)}
                    className="dropdown-row"
                    key={item.Branded}
                  >
                    {item.Branded}
                  </div>
                ))}
            </div>
          </div>

        </div>
        
        <div className='showdata'>
          {dataa.filter(item => item.isSelected).map((selectedItem, index) => (
            <div key={index} className='selectedddd'>
              <span>{selectedItem.Branded}</span>
              <span>{selectedItem.Generic}</span>

            </div>

          ))}
          <button onClick={handleCompareButtonClick} className='selecte'>Compare</button>
          <MyVerticallyCenteredModal
            data={selectedItems}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </div>
        
        <button className='butt' id='plced' onClick={()=>{
          handlenav()}}>Confuse in Branded vs Generic</button>  

        <div className="tableContainer">
          <table id="medicineTable">
            <thead>
              <tr>
                <th>Select</th>
                <th>Department Name</th>

                <th>Branded Name</th>
                <th>Generic Name</th>
                <th>Branded Cost</th>
                <th>Generic Cost</th>
              </tr>
            </thead>
            <tbody>
              {sear.length > 0 ? (
                sear.map((result, index) => (
                  <tr key={index}>
                    <td className='cenrr'>
                      <input
                        type='checkbox'
                        checked={dataa.isSelected}
                        onChange={() => handleCheckboxChange(result._id)}
                      />
                    </td>
                    <td>

                      <span className="department-box">{result.Department}</span>
                    </td>

                    <td>
                      {result.Branded}<span className="department-boxx">{result.Dosage}</span>
                    </td>
                    <td>{result.Generic}</td>
                    <td>{result.Bcost}</td>
                    <td>{result.Gcost}</td>
                  </tr>
                ))
              ) : (
                dataa.map((result, index) => (
                  <tr key={index}>
                    <td className='cenrr'>
                      <input
                        type='checkbox'
                        checked={dataa.isSelected}
                        onChange={() => handleCheckboxChange(result._id)}
                      />
                    </td>
                    <td>

                      <span className="department-box">{result.Department}</span>
                    </td>

                    <td>
                      {result.Branded}<span className="department-boxx">{result.Dosage}</span>
                    </td>
                    <td>{result.Generic}</td>
                    <td>{result.Bcost}</td>
                    <td>{result.Gcost}</td>
                  </tr>
                ))
              )}




            </tbody>
          </table>
        </div>
      </div>

      
    </>
  );
}

export default Branded;

// import React, { useState, useEffect } from 'react';
// import NavDesign from './NavDesign';
// import './Branded.css';
// import axios from 'axios';

// function Branded() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [value, setValue] = useState('');
//   const [dataa, setdataa] = useState([]);

//   useEffect(() => {
//     getdata();
//   }, []);

//   const getdata = async () => {
//     try {
//       const response = await axios.get('http://localhost:8090/Medcine');
//       const modifiedData = response.data.map(item => ({
//         ...item,
//         isSelected: false
//       }));
//       setdataa(modifiedData);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:8090/Medcine?search=${value}`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   const handleCheckboxChange = (_id) => {
//     const updatedData = dataa.map(item => {
//       if (item._id === _id) {
//         return { ...item, isSelected: !item.isSelected };
//       }
//       return item;
//     });
//     setdataa(updatedData);

//     const selectedIds = updatedData.filter(item => item.isSelected).map(item => item._id);
//     setSelectedItems(selectedIds);
//   };

//   const onChange = (event) => {
//     setValue(event.target.value);
//   };

//   const onSearch = (searchTerm) => {
//     setValue(searchTerm);
//     console.log("search ", searchTerm);
//   };

//

//   return (
//     <>
//       <NavDesign />
//       <div className='inside'>
//         <div className="search-container">
//           <div className='cenrr'>
//             <div className="search-inner">
//               <input type="text" value={value} className='somee' onChange={onChange} placeholder="Search for medicines..." />
//               <button onClick={handleSearch}>Search</button>
//             </div>
//             <div className="dropdown">
//               {searchResults.map((item, index) => (
//                 <div onClick={() => onSearch(item.Branded)} className="dropdown-row" key={index}>
//                   {item.Branded}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className='showdata'>
//           <h2>Selected Items:</h2>
//           <ul>
//             {dataa.filter(item => item.isSelected).map(item => (
//               <li key={item._id}>{item.Branded}</li>
//             ))}
//           </ul>
//           <button onClick={handleCompareButtonClick} className='selecte'>Compare</button>
//         </div>

//         <div id="tableContainer">
//           <table id="medicineTable">
//             <thead>
//               <tr>
//                 <th>Select</th>
//                 <th>Branded Name</th>
//                 <th>Generic Name</th>
//                 <th>Branded Cost</th>
//                 <th>Generic Cost</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataa.map((result, index) => (
//                 <tr key={index}>
//                   <td className='cenrr'>
//                     <input
//                       type='checkbox'
//                       checked={result.isSelected}
//                       onChange={() => handleCheckboxChange(result._id)}
//                     />
//                   </td>
//                   <td>{result.Branded}</td>
//                   <td>{result.Generic}</td>
//                   <td>{result.Bcost}</td>
//                   <td>{result.Gcost}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Branded;
