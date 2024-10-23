import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function GroupCriteriaDetails() {
    const { id } = useParams();
    const [groupCriteria, setGroupCriteria] = useState(null);
    const [error, setError] = useState(null);
 
    useEffect(() => {
        const fetchGroupCriteria = async () => {
          try {
            const response = await fetch(`/api/groups-criteria/${id}`);
            const data = await response.json();
    
            if (response.ok) {
              setGroupCriteria(data);
            } else {
              setError('Failed to fetch Group Criteria details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchGroupCriteria();
      }, [id]);

      if (!groupCriteria) return <div>Loading...</div>;

      return (
        <div className="feed-details container mx-auto p-6">
          <h2 className='text-2xl font-bold mb-6'>Group Criteria Details</h2>
          {error && <div className="error">{error}</div>}
          <div className=" bg-white p-6 rounded-lg shadow-md border border-gray-200">            
            <div className='mb-4'>
              <strong className='mr-3'>Criteria:</strong> {groupCriteria.key}
            </div>
            <div className='mt-4'>
              <strong className='mr-3'>Value:</strong>{groupCriteria.value}
            </div>
          </div>
      <div className="mt-4">
        <Link
          to="/criterialist"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          previous page
        </Link>
      </div>

        </div>
      );    
    
}