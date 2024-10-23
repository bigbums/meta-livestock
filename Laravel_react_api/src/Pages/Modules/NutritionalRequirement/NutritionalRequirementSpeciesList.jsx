import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function NutritionalRequirementSpeciesList({ speciesId }) {
  const [nutritionalRequirements, setNutritionalRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionalRequirements = async () => {
      try {
        const response = await fetch(`/api/nutritional-requirements?species_id=${speciesId}`);
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
  }, [speciesId]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this requirement?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/nutritional-requirements/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted requirement from the state
        setNutritionalRequirements((prevRequirements) =>
          prevRequirements.filter((requirement) => requirement.id !== id)
        );
      } else {
        setError('Failed to delete the requirement');
      }
    } catch (error) {
      setError('Error deleting requirement: ' + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="nutritional-requirement-species-list mb-4 border rounded-md border-dashed border-slate-400">
      <h2 className="font-bold text-2xl mb-4">Nutritional Requirements for Species</h2>
      <Link to="/modules/nutritional-requirement/form" className="nav-link c-white bg-black float-end" style={{ color: 'white' }}>
        Add Nutritional Requirement
      </Link>

      {nutritionalRequirements.length === 0 ? (
        <div>No nutritional requirements found for this species.</div>
      ) : (
        <table className="min-w-full border-collapse border border-slate-400">
          <thead>
            <tr>
              <th className="border border-slate-300 p-2">Species ID</th>
              <th className="border border-slate-300 p-2">Breed ID</th>
              <th className="border border-slate-300 p-2">Requirement Type</th>
              <th className="border border-slate-300 p-2">Requirement Value</th>
              <th className="border border-slate-300 p-2">Age Range</th>
              <th className="border border-slate-300 p-2">Weight Range</th>
              <th className="border border-slate-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nutritionalRequirements.map((requirement) => (
              <tr key={requirement.id}>
                <td className="border border-slate-300 p-2">
                  <Link to={`/nutritional-requirements/${requirement.id}`}>
                    {requirement.species_id}
                  </Link>
                </td>
                <td className="border border-slate-300 p-2">{requirement.breed_id}</td>
                <td className="border border-slate-300 p-2">{requirement.requirement_type}</td>
                <td className="border border-slate-300 p-2">{requirement.requirement_value}</td>
                <td className="border border-slate-300 p-2">{requirement.age_range}</td>
                <td className="border border-slate-300 p-2">{requirement.weight_range}</td>
                <td className="border border-slate-300 p-2 text-center">
                  <Link to={`/modules/nutritional-requirement/details/${requirement.id}`} className="text-blue-500 hover:underline mx-2">
                    View
                  </Link>
                  <Link to={`/nutritional-requirement/${requirement.id}/edit`} className="text-green-500 hover:underline mx-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(requirement.id)}
                    className="text-red-500 hover:underline mx-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
