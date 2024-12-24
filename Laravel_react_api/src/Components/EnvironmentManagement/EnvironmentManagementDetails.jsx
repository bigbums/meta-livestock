// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';

// const BreedingGroupDetails = () => {
//     const { id } = useParams();
//     const [programs, setPrograms] = useState(null);
//     const [error, setError] = useState(null);


//     useEffect(() => {
//         const fetchBreedingProgram = async () => {
//           try {
//             const response = await fetch(`/api/breeding-groups/${id}`);
//             const data = await response.json();
//             console.log(data); 
    
//             if (response.ok) {
//               setPrograms(data);
//             } else {
//               setError('Failed to fetch Breeding groups details');
//             }
//           } catch (error) {
//             setError('Error: ' + error.message);
//           }
//         };
    
//         fetchBreedingProgram();
//       }, [id]);

//       if (error) return <div>{error}</div>;
//       if (!programs) return <div>Loading Breeding groups details...</div>;
    


//       return (
// <div className="container mx-auto p-6">
//   <h2 className="text-2xl font-bold mb-6">Breeding Group Details</h2>

//   {error && <div className="text-red-500 mb-4">{error}</div>}

//   <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
//     <table className="min-w-full divide-y divide-gray-200">
//       <tbody>
//         <tr className="bg-gray-50">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.breeding_group_name || 'N/A'}</td>
//         </tr>
//         <tr className="bg-white">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Group Type:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.group_type || 'No description available'}</td>
//         </tr>
//         <tr className="bg-gray-50">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Start Date:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.start_date || 'No description available'}</td>
//         </tr>
//         <tr className="bg-white">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">End Date:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.end_date || 'No description available'}</td>
//         </tr>
//         <tr className="bg-gray-50">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Male Count:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.male_count || 'No description available'}</td>
//         </tr>
//         <tr className="bg-white">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Female Count:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.female_count || 'No description available'}</td>
//         </tr>
//         <tr className="bg-gray-50">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Location:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.location || 'No description available'}</td>
//         </tr>
//         <tr className="bg-white">
//           <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Notes:</th>
//           <td className="px-6 py-4 text-sm text-gray-900">{programs.notes || 'No description available'}</td>
//         </tr>
//       </tbody>
//     </table>
//   </div>

//   <div className="mt-4">
//     <Link
//       to="/breeding-group-list"
//       className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//     >
//       Previous Page
//     </Link>
//   </div>
// </div>
//       );
// }
// export default BreedingGroupDetails