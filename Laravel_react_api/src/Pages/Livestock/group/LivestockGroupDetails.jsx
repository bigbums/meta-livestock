import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function LivestockGroupDetails() {
    const { id } = useParams();
    const [livestockGroups, setLivestockGroups] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLivestockGroups = async () => {
          try {
            const response = await fetch(`/api/livestock-groups/${id}`);
            const data = await response.json();
            console.log(data); 

    
            if (response.ok) {
              setLivestockGroups(data);
              console.log(data)
            } else {
              setError('Failed to get Livestock Group details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchLivestockGroups();
      }, [id]);
     
      if (error) return <div>{error}</div>;
      if (!livestockGroups) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Livestock Group Details</h2>
      {error && <div className="error">{error}</div>}
    
        <div className=" bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Group: {livestockGroups.name}</h2>


            <div className='mb-4'>
                <strong className='mr-3'>Name:</strong> {livestockGroups.name}
            </div>

            <div className='mt-4'>
                <strong className='mr-3'>Description:</strong> {livestockGroups.description}
            </div>

        </div>

        <div className=" bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-5">
          <h1>Livestocks</h1>
          <div className="overflow-x-auto">
      
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">ID</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Type</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Species ID</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Breed ID</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Date of Birth</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Gender</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Name</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Health Status</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">Herd ID</th>
            <th className="py-2 px-4 text-left text-gray-700 font-semibold">TAG ID</th>
          </tr>
        </thead>
        <tbody>
          {livestockGroups.livestock && livestockGroups.livestock.length > 0 ? (
            livestockGroups.livestock.map((livestockItem, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-700">{livestockItem.id}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.type}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.species_id}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.breed_id}</td>
                <td className="py-2 px-4 text-gray-700">{new Date(livestockItem.date_of_birth).toLocaleDateString()}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.gender}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.name}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.health_status}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.herd_id}</td>
                <td className="py-2 px-4 text-gray-700">{livestockItem.tag_id}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="py-4 px-4 text-center text-gray-500">No livestock available for this group.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>      </div>

        <button
            className="text-blue-600 ml-2">
              <Link to='criteriaform'>
                Add livestock
              </Link>
          </button>

    </div>
  );
}
