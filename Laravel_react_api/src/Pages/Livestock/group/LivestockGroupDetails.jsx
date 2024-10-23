import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


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

            <div className='mb-4'>
                <strong className='mr-3'>Name:</strong> {livestockGroups.name}
            </div>

            <div className='mt-4'>
                <strong className='mr-3'>Description:</strong> {livestockGroups.description}
            </div>

        </div>
    </div>
  );
}
