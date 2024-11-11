import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function BreedingProgramDetails  () {
    const { id } = useParams();
    const [programs, setPrograms] = useState(null);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchBreedingProgram = async () => {
          try {
            const response = await fetch(`/api/breeding-programs/${id}`);
            const data = await response.json();
            console.log(data); 
    
            if (response.ok) {
              setPrograms(data);
            } else {
              setError('Failed to fetch Breeding Programmes details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchBreedingProgram();
      }, [id]);

      if (error) return <div>{error}</div>;
      if (!programs) return <div>Loading Breeding Programme details...</div>;
    
    
      return (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Breeding Program Details</h2>
    
          {error && <div className="text-red-500 mb-4">{error}</div>}
    
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Name:</strong>
              <p className="text-lg">{programs.program_name || 'N/A'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Objective:</strong>
              <p className="text-lg">{programs.description || 'No description available'}</p>
            </div>

            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">Start Date:</strong>
              <p className="text-lg">{programs.start_date || 'No description available'}</p>
            </div>
            <div className="flex mb-4">
              <strong className="mr-5 text-gray-700">End Date:</strong>
              <p className="text-lg">{programs.end_date || 'No description available'}</p>
            </div>
          </div>
    
          <div className="mt-4">
            <Link
              to="/breeding-programs-list"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              previous page
            </Link>
          </div>
    
        </div>
      );
    }