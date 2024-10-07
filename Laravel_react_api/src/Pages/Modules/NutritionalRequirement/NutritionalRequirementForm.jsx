// File: ../Pages/Modules/NutritionalRequirement/NutritionalRequirementForm.jsx
import { useState } from 'react';

export default function NutritionalRequirementForm({ livestockId }) {
  const [formData, setFormData] = useState({
    livestock_id: livestockId, // Foreign key to link the nutritional requirement to the livestock
    species_id: '',
    breed_id: '',
    age_range: '',
    weight_range: '',
    health_status: '',
    production_type: '',
    requirement_type: '',
    requirement_value: ''
  });

  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      species: selectedSpecies, // Add the selected species ID
      breed: selectedBreed,     // Add the selected breed ID
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/nutritional-requirements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Nutritional requirement added successfully!');
        // Clear form after successful submission
        setFormData({
          livestock_id: livestockId,
          species_id: '',
          breed_id: '',
          age_range: '',
          weight_range: '',
          health_status: '',
          production_type: '',
          requirement_type: '',
          requirement_value: ''
        });
      } else {
        setMessage('Failed to add nutritional requirement: ' + data.message);
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div className="nutritional-requirement-form">
      <h2>Add Nutritional Requirement</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Species ID:
          <input
            type="text"
            name="species_id"
            value={formData.species_id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Breed ID:
          <input
            type="text"
            name="breed_id"
            value={formData.breed_id}
            onChange={handleChange}
          />
        </label>
        <label>
          Age Range:
          <input
            type="text"
            name="age_range"
            value={formData.age_range}
            onChange={handleChange}
          />
        </label>
        <label>
          Weight Range:
          <input
            type="text"
            name="weight_range"
            value={formData.weight_range}
            onChange={handleChange}
          />
        </label>
        <label>
          Health Status:
          <input
            type="text"
            name="health_status"
            value={formData.health_status}
            onChange={handleChange}
          />
        </label>
        <label>
          Production Type:
          <input
            type="text"
            name="production_type"
            value={formData.production_type}
            onChange={handleChange}
          />
        </label>
        <label>
          Requirement Type:
          <input
            type="text"
            name="requirement_type"
            value={formData.requirement_type}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Requirement Value:
          <input
            type="number"
            name="requirement_value"
            value={formData.requirement_value}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
