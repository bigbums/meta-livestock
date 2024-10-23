// import  { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function LivestockGroupForm() {
//   const [groupName, setGroupName] = useState('');
//   const [description, setDescription] = useState('');
//   const [criteriaKeys, setCriteriaKeys] = useState(['']);  // Array to hold multiple keys
//   const [criteriaValues, setCriteriaValues] = useState(['']);  // Array to hold corresponding values
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate()

//   // const handleAddCriteria = () => {
//   //   setCriteriaKeys([...criteriaKeys, '']); // Add an empty string for a new key input
//   //   setCriteriaValues([...criteriaValues, '']); // Add an empty string for a new value input
//   // };

//   // const handleCriteriaKeyChange = (index, event) => {
//   //   const updatedKeys = criteriaKeys.map((key, idx) => 
//   //     idx === index ? event.target.value : key
//   //   );
//   //   setCriteriaKeys(updatedKeys);
//   // };

//   // const handleCriteriaValueChange = (index, event) => {
//   //   const updatedValues = criteriaValues.map((value, idx) =>
//   //     idx === index ? event.target.value : value
//   //   );
//   //   setCriteriaValues(updatedValues);
//   // };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // const criteria = criteriaKeys.map((key, index) => ({
//     //   key: key,
//     //   value: criteriaValues[index],
//     // }));

//     const groupData = {
//       name: groupName,
//       description: description,
//     };
//     try {
//       const response = await fetch('/api/livestock-groups', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(groupData),
//       });

//       if (response.ok) {
//         const data = await response.json();  // Convert the response to JSON
//         navigate('/livestockgrouplist')
//         // Log the parsed JSON data
//         console.log('Livestock Groups:', data);

//         setMessage('Group created successfully!');
//         setGroupName('');
//         setDescription('');
//       //   setCriteriaKeys(['']); // Reset criteria keys
//       //   setCriteriaValues(['']); // Reset criteria values
//       // } else {
//         setMessage('Group Created Succesfully');
//       }
//     } catch (error) {
//       setMessage('Error: ' + error.message);
//     }
//   };

//   return (
//     <div className="group-form-container">
//       <h2>Create New Livestock Group</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="groupName">Group Name:</label>
//           <input
//             type="text"
//             id="groupName"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             required
//           />
//         </div>

//         <div>
//           <label htmlFor="groupName">Description:</label>
//           <input
//             type="text"
//             id="groupName"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//           />
//         </div>


//         {/* <h3>Group Criteria</h3>
//         {criteriaKeys.map((_, index) => (
//           <div key={index}>
//             <label htmlFor={`key-${index}`}>Criteria Key:</label>
//             <input
//               type="text"
//               id={`key-${index}`}
//               value={criteriaKeys[index]}
//               onChange={(e) => handleCriteriaKeyChange(index, e)}
//               required
//             />

//             <label htmlFor={`value-${index}`}>Criteria Value:</label>
//             <input
//               type="text"
//               id={`value-${index}`}
//               value={criteriaValues[index]}
//               onChange={(e) => handleCriteriaValueChange(index, e)}
//               required
//             />
//           </div>
//         ))} */}

//         {/* <button type="button" onClick={handleAddCriteria}>
//           Add Another Criteria
//         </button> */}

//         <button type="submit" className='ml-5'>Create Group</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default LivestockGroupForm;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LivestockGroupForm() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [criteria, setCriteria] = useState([]); // State for existing criteria
  const [selectedCriteria, setSelectedCriteria] = useState([]); // State for selected criteria
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Fetch existing criteria when the component mounts
  useEffect(() => {
    const fetchCriteria = async () => {
      try {
        const response = await fetch('/api/groups-criteria'); // Adjust this endpoint as necessary
        if (response.ok) {
          const data = await response.json();
          setCriteria(data); // Assuming data is an array of criteria objects
        } else {
          throw new Error('Failed to fetch criteria');
        }
      } catch (error) {
        console.error('Error fetching criteria:', error);
        setMessage('Error fetching criteria');
      }
    };

    fetchCriteria();
  }, []);

  const handleSelectChange = (event) => {
    const options = event.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    setSelectedCriteria(selectedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const groupData = {
      name: groupName,
      description: description,
      selectedCriteria: selectedCriteria, // Include selected criteria IDs
    };

    try {
      const response = await fetch('/api/livestock-groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(groupData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Livestock Group Created:', data);
        setMessage('Group created successfully!');
        navigate('/livestockgrouplist');
      } else {
        const errorData = await response.json();
        setMessage('Error creating group: ' + errorData.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="group-form-container">
      <h2>Create New Livestock Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <h3>Select Group Criteria</h3>
        <select
          id="criteriaSelect"
          multiple // Allow multiple selections
          value={selectedCriteria}
          onChange={handleSelectChange}
          size={5} // Set size to show multiple options at once
        >
          {criteria.map((criterion) => (
            <option key={criterion.id} value={criterion.id}>
              {criterion.key}: {criterion.value}
            </option>
          ))}
        </select>

        <button type="submit" className='ml-5'>Create Group</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default LivestockGroupForm;