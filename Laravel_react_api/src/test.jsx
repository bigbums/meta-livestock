import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from './Context/AppContext';

export default function CriteriaUpdate() {
  const { id } = useParams(); // Get the criteria ID from the route params
  const [criteria, setCriteria] = useState([{ key: '', value: '' }]); // Initialize with empty criteria
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { token } = useContext(AppContext); // Get the auth token     


  // Fetch existing criteria details
  useEffect(() => {
    const fetchCriteriaDetails = async () => {
      try {
        const response = await fetch(`/api/groups-criteria/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token for authentication
            },
          });
        
        const data = await response.json();

        if (response.ok) {
          // Set the criteria with the data retrieved
          
          setCriteria(data.criteria || data);
                } else {
          setError('Failed to fetch group criteria details');
        }
      } catch (error) {
        setError('Error fetching criteria: ' + error.message);
      }
    };

    fetchCriteriaDetails();
  }, [id, token]);

  // Handle input changes
  const handleCriteriaChange = (index, event) => {
    const updatedCriteria = criteria.map((criterion, idx) =>
      idx === index ? { ...criterion, [event.target.name]: event.target.value } : criterion
    );
    setCriteria(updatedCriteria);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await fetch(`/api/groups-criteria/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify({ criteria }),
      });

      if (response.ok) {
          const data = await response.json();
          console.log(data);
    
        setMessage('Criteria updated successfully!');
        navigate('/criterialist'); // Navigate back to the list after successful update
      } else {
        setError('Failed to update group criteria');
      }
    } catch (error) {
      setError('Error updating criteria: ' + error.message);
    }
  };
//   if (!crit || !Array.isArray(crit)) {
//     return <div>No criteria available to display</div>;
//   }
console.log(criteria);

return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Group Criteria</h2>
  
      {message && <div className="text-green-500">{message}</div>}
      {error && <div className="text-red-500">{error}</div>}
  
      <form onSubmit={handleSubmit}>
        {Array.isArray(criteria) && criteria.length > 0 ? (
          criteria.map((criterion, index) => (
            <div key={index} className="mb-4">
              <label className="block font-bold">Criteria Key:</label>
              <input
                type="text"
                id='key'
                name="key"
                value={criterion.key}
                onChange={(event) => handleCriteriaChange(index, event)}
                className="border p-2 w-full"
                required
              />
  
              <label className="block font-bold mt-2">Criteria Value:</label>
              <input
                type="text"
                id='value'
                name="value"
                value={criterion.value}
                onChange={(event) => handleCriteriaChange(index, event)}
                className="border p-2 w-full"
                required
              />
            </div>
          ))
        ) : (
          <div>No criteria available</div> // You can customize this message
        )}
      </form>
  
      <div className="mt-4">
        <button
          onClick={() => navigate('/criterialist')}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Criteria List
        </button>
      </div>
    </div>
  );
}  