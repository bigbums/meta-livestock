// File: ../Pages/Modules/NutritionalRequirement/NutritionalRequirementDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function NutritionalRequirementDetails() {
  const { id } = useParams();  // Get the nutritional requirement ID from the URL
  const [nutritionalRequirement, setNutritionalRequirement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch a specific nutritional requirement based on ID
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!nutritionalRequirement) {
    return <div>Nutritional requirement not found.</div>;
  }

  return (
    <div className="nutritional-requirement-details">
      <h2>Nutritional Requirement Details</h2>
      <p><strong>Species:</strong> {nutritionalRequirement.species.name}</p>
      <p><strong>Breed:</strong> {nutritionalRequirement.breed ? nutritionalRequirement.breed.name : 'N/A'}</p>
      <p><strong>Age Range:</strong> {nutritionalRequirement.age_range}</p>
      <p><strong>Weight Range:</strong> {nutritionalRequirement.weight_range}</p>
      <p><strong>Health Status:</strong> {nutritionalRequirement.health_status}</p>
      <p><strong>Production Type:</strong> {nutritionalRequirement.production_type}</p>
      <p><strong>Requirement Type:</strong> {nutritionalRequirement.requirement_type}</p>
      <p><strong>Requirement Value:</strong> {nutritionalRequirement.requirement_value}</p>
      
      <Link to="/nutritional-requirements">Back to List</Link>
    </div>
  );
}
