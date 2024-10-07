// File: ../Pages/Modules/NutritionalRequirement/NutritionalRequirementList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NutritionalRequirementSpeciesForm from '../'

export default function NutritionalRequirementList({ livestockId }) {
  const [nutritionalRequirements, setNutritionalRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch nutritional requirements based on livestock_id
    const fetchNutritionalRequirements = async () => {
      try {
        const response = await fetch(`/api/nutritional-requirements?livestock_id=${livestockId}`);
        const data = await response.json();

        if (response.ok) {
          setNutritionalRequirements(data);
        } else {
          setError('Failed to fetch nutritional requirements');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionalRequirements();
  }, [livestockId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="nutritional-requirement-list">
      <h2>Nutritional Requirements</h2>
      <Link to={NutritionalRequirementForm} className="nav-link c-white bg-black float-end" style={{ color: 'white' }}>
                Add Nutritional Requirement
                </Link>
      {nutritionalRequirements.length === 0 ? (
        <div>No nutritional requirements found for this livestock.</div>
      ) : (
        <ul>
          {nutritionalRequirements.map((requirement) => (
            <li key={requirement.id}>
              <Link to={`/nutritional-requirements/${requirement.id}`}>
                {requirement.requirement_type} - {requirement.requirement_value} (Species: {requirement.species.name})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
