import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function EstrusCycleDetails  () {
    const { id } = useParams();
    const [cycles, setCycles] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchEstrusCycles = async () => {
          try {
            const response = await fetch(`/api/estrus-cycles/${id}`);
            const data = await response.json();
            console.log(data); 
    
            if (response.ok) {
              setCycles(data);
            } else {
              setError('Failed to fetch Estrus Cycle details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchEstrusCycles();
      }, [id]);

      if (error) return <div>{error}</div>;
      if (!cycles) return <div>Loading Estrus Cycle details...</div>;
    
    
      return (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Estrus Cycle Details</h2>
    
          {error && <div className="text-red-500 mb-4">{error}</div>}
    
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">ID:</strong>
              <p className="text-lg">{cycles.livestock_id || 'N/A'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Activity Level:</strong>
              <p className="text-lg">{cycles.activity_level || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Temperature Change:</strong>
              <p className="text-lg">{cycles.temperature_change || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Notes:</strong>
              <p className="text-lg">{cycles.behavior_notes || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Start Date:</strong>
              <p className="text-lg">{cycles.start_date || 'No description available'}</p>
            </div>
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">End Date:</strong>
              <p className="text-lg">{cycles.end_date || 'No description available'}</p>
            </div>
          </div>
    
          <div className="mt-4">
            <Link
              to="/estrus-cycles-list"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              previous page
            </Link>
          </div>
    
        </div>
      );
    }