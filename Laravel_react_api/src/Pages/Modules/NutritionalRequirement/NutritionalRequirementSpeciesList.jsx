// File: ../Pages/Modules/NutritionalRequirement/NutritionalRequirementSpeciesList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NutritionalRequirementSpeciesList({ speciesId }) {
  const [nutritionalRequirements, setNutritionalRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch nutritional requirements for the given species
    const fetchNutritionalRequirements = async () => {
      try {
        const response = await fetch(`/api/nutritional-requirements?species_id=${speciesId}`);
        const data = await response.json();

        console.log(data)

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  

//   return (
//     <div className="nutritional-requirement-species-list mb-4 border rounded-md border-dashed border-slate-400">
//       <h2 className="font-bold text-2xl mb-4">Nutritional Requirements for Species</h2>
//       <Link to="/modules/nutritional-requirement/form" className="nav-link c-white bg-black float-end" style={{ color: 'white' }}>
//                 Add Nutritional Requirement
//                 </Link>
//       {nutritionalRequirements.length === 0 ? (
//         <div>No nutritional requirements found for this species.</div>
//       ) : (
//         <ul>
//           {nutritionalRequirements.map((requirement) => (
//             <li key={requirement.id}>
//               <Link to={`/nutritional-requirements/${requirement.id}`}>
//                 {requirement.species_id} {requirement.breed_id} {requirement.requirement_type} - {requirement.requirement_value} (Age: {requirement.age_range}, Weight: {requirement.weight_range})
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

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
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);
}