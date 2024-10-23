// File: ../Pages/Modules/FeedType/FeedTypeFormDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FeedTypeFormDetails() {
  const { id } = useParams();
  const [feedType, setFeedType] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedType = async () => {
      try {
        const response = await fetch(`/api/feed-types/${id}`);
        const data = await response.json();
        console.log(data); 

        if (response.ok) {
          setFeedType(data);
        } else {
          setError('Failed to fetch feed type details');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedType();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!feedType) return <div>Loading feed type details...</div>;
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Feed Type Details</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <strong className="text-gray-700">Name:</strong>
          <p className="text-lg">{feedType.feed_type_name || 'N/A'}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Description:</strong>
          <p className="text-lg">{feedType.feed_type_desc || 'No description available'}</p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to="/modules/FeedTypes/FeedTypeFormList"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          previous page
        </Link>
      </div>

    </div>
  );
}