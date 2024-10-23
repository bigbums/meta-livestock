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
  console.log(id)

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
    <div className="nutritional-requirement-details mb-4 border rounded-md border-dashed border-slate-400 p-4">
      <h2 className="font-bold text-2xl mb-4">Nutritional Requirement Details</h2>
      <table className="min-w-full table-row-group border-collapse border border-slate-400">
        <tbody>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Species</th>
            <td className="p-2 border border-slate-300">
              {nutritionalRequirement.species ? nutritionalRequirement.species.name : 'Unknown'}
            </td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Breed</th>
            <td className="p-2 border border-slate-300">
              {nutritionalRequirement.breed ? nutritionalRequirement.breed.name : 'N/A'}
            </td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Age Range</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.age_range}</td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Weight Range</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.weight_range}</td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Health Status</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.health_status}</td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Production Type</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.production_type}</td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Requirement Type</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.requirement_type}</td>
          </tr>
          <tr className="border-b">
            <th className="text-left p-2 border border-slate-300 bg-gray-200">Requirement Value</th>
            <td className="p-2 border border-slate-300">{nutritionalRequirement.requirement_value}</td>
          </tr>
        </tbody>
      </table>
  
      <Link
        to="/modules/nutritional-requirement/list"
        className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block"
      >
        Back to List
      </Link>
    </div>
  );
}  