// import { useState, useEffect, useContext } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { AppContext } from '../../../Context/AppContext';

// export default function CriteriaUpdate() {
//     const { id } = useParams();
//     const [groupCriteria, setGroupCriteria] = useState({ key: '', value: '' });
//     const navigate = useNavigate();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const { token } = useContext(AppContext); // Get the auth token     

//     useEffect(() => {
//         const fetchGroupCriteria = async () => {
//           try {
//             const response = await fetch(`/api/groups-criteria/${id}`, {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Pass the token for authentication
//               },
//             });
//             const data = await response.json();
    
//             if (response.ok) {
//               setGroupCriteria(data); // Set the data in state
//               setLoading(false);
//             } else {
//               setError('Could not load Group Criteria');
//             }
//           } catch (error) {
//             setError('Error: ' + error.message);
//           }
//         };
    
//         fetchGroupCriteria();
//       }, [id, token]);
    

//       const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setGroupCriteria((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
    
//         try {
//           const response = await fetch(`/api/groups-criteria/${id}`, {
//             method: 'PUT', // Use PUT for updating data
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(groupCriteria),
//           });
    
//           if (response.ok) {
//             const data = await response.json();
//             console.log(data);
            

//             // navigate('/criteriaform'); 
//             // navigate('/criterialist'); 
//             // Redirect after successful update
//           } else {
//             const errorData = await response.json();
//             setError('Failed to update Group Criteria: ' + errorData.message);
//           }
//         } catch (error) {
//           setError('Error: ' + error.message);
//         }
//       };
    
    
//       return (
//         <div className="container mx-auto p-4">
//           <h2 className="text-2xl font-bold mb-4">Edit Group Criteria</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <form onSubmit={handleSubmit}>
//               {error && <p className="text-red-500">{error}</p>}
    
//               <div className="mb-4">
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                   Criteria
//                 </label>
//                 <input
//                   type="text"
//                   id="key"
//                   name="name"
//                   value={groupCriteria.key}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 p-2 rounded"
//                   required
//                 />
//               </div>
    
//               <div className="mb-4">
//                 <label htmlFor="value" className="block text-sm font-medium text-gray-700">
//                   Value
//                 </label>
//                 <textarea
//                   id="value"
//                   name="value"
//                   value={groupCriteria.value}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 p-2 rounded"
//                 ></textarea>
//               </div>
    
//               <button
//                 type="submit"
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Save Changes
//               </button>
//             </form>
//           )}
//         </div>
//       );
    
// }





// import { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// export default function CriteriaUpdate() {
//   const { id } = useParams(); // Get the criteria ID from the route params
//   const [criteria, setCriteria] = useState([{ key: '', value: '' }]); // Initialize with empty criteria
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   // Fetch existing criteria details
//   useEffect(() => {
//     const fetchCriteriaDetails = async () => {
//       try {
//         const response = await fetch(`/api/groups-criteria/${id}`);
//         const data = await response.json();

//         if (response.ok) {
//           // Set the criteria with the data retrieved
          
//           setCriteria(data.criteria || data);
//                 } else {
//           setError('Failed to fetch group criteria details');
//         }
//       } catch (error) {
//         setError('Error fetching criteria: ' + error.message);
//       }
//     };

//     fetchCriteriaDetails();
//   }, [id]);

//   // Handle input changes
//   const handleCriteriaChange = (index, event) => {
//     const updatedCriteria = criteria.map((criterion, idx) =>
//       idx === index ? { ...criterion, [event.target.name]: event.target.value } : criterion
//     );
//     setCriteria(updatedCriteria);
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch(`/api/groups-criteria/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ criteria }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Criteria updated successfully!');
//         navigate('/criterialist'); // Navigate back to the list after successful update
//       } else {
//         setError('Failed to update group criteria');
//       }
//     } catch (error) {
//       setError('Error updating criteria: ' + error.message);
//     }
//   };
// //   if (!crit || !Array.isArray(crit)) {
// //     return <div>No criteria available to display</div>;
// //   }
// console.log(criteria);

// return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Edit Group Criteria</h2>
  
//       {message && <div className="text-green-500">{message}</div>}
//       {error && <div className="text-red-500">{error}</div>}
  
//       <form onSubmit={handleSubmit}>
//         {Array.isArray(criteria) && criteria.length > 0 ? (
//           criteria.map((criterion, index) => (
//             <div key={index} className="mb-4">
//               <label className="block font-bold">Criteria Key:</label>
//               <input
//                 type="text"
//                 name="key"
//                 value={criterion.key}
//                 onChange={(event) => handleCriteriaChange(index, event)}
//                 className="border p-2 w-full"
//                 required
//               />
  
//               <label className="block font-bold mt-2">Criteria Value:</label>
//               <input
//                 type="text"
//                 name="value"
//                 value={criterion.value}
//                 onChange={(event) => handleCriteriaChange(index, event)}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           ))
//         ) : (
//           <div>No criteria available</div> // You can customize this message
//         )}
//       </form>
  
//       <div className="mt-4">
//         <button
//           onClick={() => navigate('/criterialist')}
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Back to Criteria List
//         </button>
//       </div>
//     </div>
//   );
// }  

// import { useState, useEffect, useContext } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { AppContext } from '../../../Context/AppContext';

// export default function CriteriaUpdate() {
//   const { id } = useParams(); // Get the criteria ID from the route params
//   const [criteria, setCriteria] = useState([{ key: '', value: '' }]); // Initialize with empty criteria
//   const [error, setError] = useState(null);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();
//   const { token } = useContext(AppContext); // Get the auth token     


//   // Fetch existing criteria details
//   useEffect(() => {
//     const fetchCriteriaDetails = async () => {
//       try {
//         const response = await fetch(`/api/groups-criteria/${id}`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Pass the token for authentication
//             },
//           });
        
//         const data = await response.json();

//         if (response.ok) {
//           // Set the criteria with the data retrieved
//           console.log(data.criteria);
          
//           setCriteria(data.criteria || data);
//                 } else {
//           setError('Failed to fetch group criteria details');
//         }
//       } catch (error) {
//         setError('Error fetching criteria: ' + error.message);
//       }
//     };

//     fetchCriteriaDetails();
//   }, [id, token]);

//   // Handle input changes
//   const handleCriteriaChange = (index, event) => {
//     const updatedCriteria = criteria.map((criterion, idx) =>
//       idx === index ? { ...criterion, [event.target.name]: event.target.value } : criterion
//     );
//     setCriteria(updatedCriteria);
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);

//     try {
//       const response = await fetch(`/api/groups-criteria/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
          
//         },
//         body: JSON.stringify({ criteria }),
//       });

//       if (response.ok) {
//           const data = await response.json();
//           console.log(data);
    
//         setMessage('Criteria updated successfully!');
//         navigate('/criterialist'); // Navigate back to the list after successful update
//       } else {
//         setError('Failed to update group criteria');
//       }
//     } catch (error) {
//       setError('Error updating criteria: ' + error.message);
//     }
//   };
// //   if (!crit || !Array.isArray(crit)) {
// //     return <div>No criteria available to display</div>;
// //   }
// // console.log(criteria);

// return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Edit Group Criteria</h2>
  
//       {message && <div className="text-green-500">{message}</div>}
//       {error && <div className="text-red-500">{error}</div>}
  
//       <form onSubmit={handleSubmit}>
//         {Array.isArray(criteria) && criteria.length > 0 ? (
//           criteria.map((criterion, index) => (


//             <div key={index} className="mb-4">

//             <label className="block font-bold">Criteria Id:</label>
//               <input
//                 type="text"
//                 id='livestock_group_id'
//                 name="Group ID"
//                 value={criterion.live}
//                 onChange={(event) => handleCriteriaChange(index, event)}
//                 className="border p-2 w-full"
//                 required
//               />



//               <label className="block font-bold">Criteria Key:</label>
//               <input
//                 type="text"
//                 id='key'
//                 name="key"
//                 value={criterion.key}
//                 onChange={(event) => handleCriteriaChange(index, event)}
//                 className="border p-2 w-full"
//                 required
//               />
  
//               <label className="block font-bold mt-2">Criteria Value:</label>
//               <input
//                 type="text"
//                 id='value'
//                 name="value"
//                 value={criterion.value}
//                 onChange={(event) => handleCriteriaChange(index, event)}
//                 className="border p-2 w-full"
//                 required
//               />
//             </div>
//           ))
//         ) : (
//           <div>No criteria available</div> // You can customize this message
//         )}
//       </form>
  
//       <div className="mt-4">
//         <button
//           onClick={() => navigate('/criterialist')}
//           className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Back to Criteria List
//         </button>
//       </div>
//     </div>
//   );
// }  




import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GroupCriteriaDetails() {
    const { id } = useParams();
    const [groupCriteria, setGroupCriteria] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroupCriteria = async () => {
            try {
                const response = await fetch(`/api/groups-criteria/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setGroupCriteria(data);
                } else {
                    setError('Failed to fetch Group Criteria details');
                }
            } catch (error) {
                setError('Error: ' + error.message);
            }
        };

        fetchGroupCriteria();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/groups-criteria/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ criteria: [{ key: groupCriteria.key, value: groupCriteria.value }] }),
            });

            if (response.ok) {
                setSuccess('Group criteria updated successfully');
                const result = await response.json();
                console.log(result);
                navigate('/criterialist');
                 // Redirect after successful update
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to update Group Criteria');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        }
    };

    if (!groupCriteria) return <div>Loading...</div>;

    return (
        <div className="feed-details">
            <h2>Edit Group Criteria</h2>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <form onSubmit={handleUpdate}>
                <div>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={groupCriteria.livestock_group_id}
                            onChange={(e) => setGroupCriteria({ ...groupCriteria, livestock_group_id: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Criteria:
                        <input
                            type="text"
                            value={groupCriteria.key}
                            onChange={(e) => setGroupCriteria({ ...groupCriteria, key: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Value:
                        <input
                            type="text"
                            value={groupCriteria.value}
                            onChange={(e) => setGroupCriteria({ ...groupCriteria, value: e.target.value })}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}