import { useState, useEffect } from 'react';

export default function GroupCriteriaForm() {
  const [criteria, setCriteria] = useState([{ key: '', value: '' }]); // Criteria array
  const [message, setMessage] = useState('');

  // Fetch existing criteria for the group when the component loads
  useEffect(() => {
    async function fetchCriteria() {
      try {
        const response = await fetch(`/api/groups`);
        const data = await response.json();
        setCriteria(data);
      } catch (error) {
        console.error('Error fetching criteria:', error);
      }
    }

   
      fetchCriteria();
    
  }, );

  const handleAddCriteria = () => {
    setCriteria([...criteria, { key: '', value: '' }]); // Add a new empty criteria field
  };

  const handleCriteriaChange = (index, event) => {
    const { name, value } = event.target;
    const updatedCriteria = [...criteria];
    updatedCriteria[index][name] = value;
    setCriteria(updatedCriteria); // Update the criteria state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/groups/criteria`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ criteria }),
      });

      if (response.ok) {
        setMessage('Criteria updated successfully!');
      } else {
        setMessage('Failed to update criteria.');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Update Criteria for Group</h2>
      <form onSubmit={handleSubmit}>
        {criteria.map((criterion, index) => (
          <div key={index} className="criteria-item">
            <label htmlFor={`key-${index}`}>Criteria Key:</label>
            <input
              type="text"
              name="key"
              value={criterion.key}
              onChange={(e) => handleCriteriaChange(index, e)}
              required
            />
            <label htmlFor={`value-${index}`}>Criteria Value:</label>
            <input
              type="text"
              name="value"
              value={criterion.value}
              onChange={(e) => handleCriteriaChange(index, e)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={handleAddCriteria}>Add Another Criteria</button>
        <button type="submit">Save Criteria</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}


