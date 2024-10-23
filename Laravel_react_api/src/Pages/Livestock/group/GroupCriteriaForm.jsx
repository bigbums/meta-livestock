// import { useState } from 'react';

// function GroupCriteriaForm() {
//   const [criteria, setCriteria] = useState([{ key: '', value: '' }]); // State for multiple criteria
//   const [message, setMessage] = useState('');

//   // Function to handle adding a new criteria field
//   const handleAddCriteria = () => {
//     setCriteria([...criteria, { key: '', value: '' }]);
//   };

//    console.log(criteria);
//   // Function to handle changes in criteria fields
//   const handleCriteriaChange = (index, event) => {
//     const updatedCriteria = criteria.map((criterion, idx) =>
//       idx === index ? { ...criterion, [event.target.name]: event.target.value } : criterion
//     );
//     setCriteria(updatedCriteria);
//   };


 

//   // Function to submit the criteria
//   const handleSubmit = async (event) => {
//     event.preventDefault();
    

//     // Prepare data for submission
//     const criteriaData = {
//       criteria,
//     };

    

//     try {
//       const response = await fetch('/api/groups-criteria', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(criteriaData),
//       });


      

//       if (response.ok) {
//         setMessage('Criteria created successfully!');
//         setCriteria([{ key: '', value: '' }]); // Reset criteria
//       } else {
//         setMessage('Failed to create criteria');
//       }
//     } catch (error) {
//       setMessage('Error: ' + error.message);
//     }
//   };

//   return (
//     <div className="criteria-form-container">
//       <h2>Create Group Criteria</h2>
//       <form onSubmit={handleSubmit}>
//         <h3>Group Criteria</h3>
//         {criteria.map((criterion, index) => (
//           <div key={index} className="criteria-input">
//             <label htmlFor={`key-${index}`}>Criteria Key:</label>
//             <input
//               type="text"
//               id={`key-${index}`}
//               name="key"
//               value={criterion.key}
//               onChange={(e) => handleCriteriaChange(index, e)}
//               required
//             />

//             <label htmlFor={`value-${index}`}>Criteria Value:</label>
//             <input
//               type="text"
//               id={`value-${index}`}
//               name="value"
//               value={criterion.value}
//               onChange={(e) => handleCriteriaChange(index, e)}
//               required
//             />
//           </div>
//         ))}

//         <button type="button" onClick={handleAddCriteria}>
//           Add Another Criteria
//         </button>

//         <button type="submit" className='ml-5'>Create Criteria</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default GroupCriteriaForm;


import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GroupCriteriaForm = () => {
    const [criteria, setCriteria] = useState([{ key: '', value: '' }]);

    const handleCriteriaChange = (index, event) => {
        const newCriteria = [...criteria];
        newCriteria[index][event.target.name] = event.target.value;
        setCriteria(newCriteria);
    };

    const addCriteria = () => {
        setCriteria([...criteria, { key: '', value: '' }]);
    };

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = {
            criteria,
            livestock_id: null, // Sending null for now since no livestock group exists yet
        };

        try {
            const response = await fetch('/api/groups-criteria', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();
            console.log(result);
            
            if (response.ok) {
                console.log('Criteria created successfully:', result);
                alert('Criteria created successfully');
                navigate('/criterialist')
            } else {
                console.error('Error creating criteria:', result);
                alert('Error creating criteria');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while submitting the form');
        }
    };

    return (
        <div className="criteria-form-container">
       <h2>Create Group Criteria</h2>
        <form onSubmit={handleSubmit}>
            {criteria.map((criterion, index) => (
                <div key={index}>
                    <input
                        type="text"
                        name="key"
                        value={criterion.key}
                        placeholder="Criteria Key"
                        onChange={(event) => handleCriteriaChange(index, event)}
                    />
                    <input
                        type="text"
                        name="value"
                        value={criterion.value}
                        placeholder="Criteria Value"
                        onChange={(event) => handleCriteriaChange(index, event)}
                    />
                </div>
            ))}
            <button type="button" onClick={addCriteria}>
                Add Another Criteria
            </button>
            <button type="submit" className='ml-5'>Submit Criteria</button>
        </form>
        </div>
    );
};

export default GroupCriteriaForm;

