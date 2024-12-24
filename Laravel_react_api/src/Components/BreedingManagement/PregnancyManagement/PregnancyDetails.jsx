import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function PregnancyDetails  () {
    const { id } = useParams();
    const [pregnancy, setPregnancies] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchPregnancies = async () => {
          try {
            const response = await fetch(`/api/pregnacy-records/${id}`);
            const data = await response.json();
            console.log(data); 
    
            if (response.ok) {
              setPregnancies(data);
            } else {
              setError('Failed to fetch pregnacy-record details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchPregnancies();
      }, [id]);

      if (error) return <div>{error}</div>;
      if (!pregnancy) return <div>Loading Pregnancy Record details...</div>;
    
    
      return (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Pregnancy Record Detail</h2>
    
          {error && <div className="text-red-500 mb-4">{error}</div>}
    
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">ID:</strong>
              <p className="text-lg">{pregnancy.livestock_id || 'N/A'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Activity Level:</strong>
              <p className="text-lg">{pregnancy.breeding_date || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Temperature Change:</strong>
              <p className="text-lg">{pregnancy.pregnancy_status || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Notes:</strong>
              <p className="text-lg">{pregnancy.detection_method || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Start Date:</strong>
              <p className="text-lg">{pregnancy.detection_date || 'No description available'}</p>
            </div>
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">End Date:</strong>
              <p className="text-lg">{pregnancy.expected_delivery_date || 'No description available'}</p>
            </div>
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Notes:</strong>
              <p className="text-lg">{pregnancy.notes || 'No description available'}</p>
            </div>

          </div>

          
    
          <div className="mt-4">
            <Link
              to="/pregnancy-records-list"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              previous page
            </Link>
          </div>
    
        </div>
      );
    }