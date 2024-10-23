// File: ../Pages/Modules/NutritionalRequirement/NutritionalRequirementEdit.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function NutritionalRequirementEdit() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [nutritionalRequirement, setNutritionalRequirement] = useState({
    species_id: '',
    breed_id: '',
    requirement_type: '',
    requirement_value: '',
    age_range: '',
    weight_range: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionalRequirement = async () => {
      try {
        const response = await fetch(`/api/nutritional-requirements/${id}`);
        const data = await response.json();

        if (response.ok) {
          setNutritionalRequirement(data);
        } else {
          setError('Failed to fetch nutritional requirement');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionalRequirement();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNutritionalRequirement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/nutritional-requirements/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nutritionalRequirement),
      });

      if (response.ok) {
        navigate(`/modules/nutritional-requirement/list`); // Redirect back to the list
      } else {
        setError('Failed to update the requirement');
      }
    } catch (error) {
      setError('Error updating requirement: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="nutritional-requirement-edit mb-4 border rounded-md border-dashed border-slate-400">
      <h2 className="font-bold text-2xl mb-4">Edit Nutritional Requirement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Species ID</label>
          <input
            type="text"
            name="species_id"
            value={nutritionalRequirement.species_id}
            onChange={handleChange}
            required
            className="border border-slate p-2"
          />
        </div>
        <div>
          <label>Breed ID</label>
          <input
            type="text"
            name="breed_id"
            value={nutritionalRequirement.breed_id}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2"
          />
        </div>
        <div>
          <label>Requirement Type</label>
          <input
            type="text"
            name="requirement_type"
            value={nutritionalRequirement.requirement_type}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2"
          />
        </div>
        <div>
          <label>Requirement Value</label>
          <input
            type="text"
            name="requirement_value"
            value={nutritionalRequirement.requirement_value}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2"
          />
        </div>
        <div>
          <label>Age Range</label>
          <input
            type="text"
            name="age_range"
            value={nutritionalRequirement.age_range}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2"
          />
        </div>
        <div>
          <label>Weight Range</label>
          <input
            type="text"
            name="weight_range"
            value={nutritionalRequirement.weight_range}
            onChange={handleChange}
            required
            className="border border-slate-300 p-2"
          />
        </div>
        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
          Update Nutritional Requirement
        </button>
      </form>
    </div>
  );
}
