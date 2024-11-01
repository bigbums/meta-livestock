import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FeedScheduleDetails ()  {
    const { id } = useParams();
    const [feedSchedules, setFeedSchedules] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedSchedules = async () => {
          try {
            const response = await fetch(`/api/feed-schedules/${id}`);
            const data = await response.json();
            console.log(data); 
    
            if (response.ok) {
              setFeedSchedules(data);
            } else {
              setError('Failed to fetch feed type details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchFeedSchedules();
      }, [id]);

      if (error) return <div>{error}</div>;
      if (!feedSchedules) return <div>Loading feed schedule details...</div>;
    
    
  
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Feed Schedule Details</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <strong className="text-gray-700">Quantity:</strong>
          <p className="text-lg">{feedSchedules.quantity || 'N/A'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Approved Quantity:</strong>
          <p className="text-lg">{feedSchedules.approved_quantity || 'No description available'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Approver:</strong>
          <p className="text-lg">{feedSchedules.approver || 'No description available'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Feed Location:</strong>
          <p className="text-lg">{feedSchedules.feed_location || 'No description available'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Frequency:</strong>
          <p className="text-lg">{feedSchedules.frequency || 'No description available'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Occurrence:</strong>
          <p className="text-lg">{feedSchedules.occurrence || 'No description available'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Time of Day:</strong>
          <p className="text-lg">{feedSchedules.time_of_day || 'No description available'}</p>
        </div>
        <div className="mb-4">
          <strong className="text-gray-700">Created at:</strong>
          <p className="text-lg">{feedSchedules.created_at || 'No description available'}</p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/modules/FeedingManagement/feedschedulelist"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          previous page
        </Link>
      </div>

    </div>
  )
}
