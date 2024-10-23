// File: ../Pages/Modules/Feeds/FeedsFormDetails.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FeedsFormDetails() {
  const { id } = useParams();
  const [feed, setFeed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`/api/feeds/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFeed(data);
        } else {
          setError('Failed to fetch feed details');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeed();
  }, [id]);

  if (!feed) return <div>Loading...</div>;

  return (
    <div className="feed-details">
      <h2>Feed Details</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <strong>Name:</strong> {feed.name}
      </div>
      <div>
        <strong>Type:</strong> {feed.feed_type.name}
      </div>
      <div>
        <strong>Amount:</strong> {feed.amount} {feed.units_of_measure}
      </div>
      <div>
        <strong>Description:</strong> {feed.description}
      </div>

      
    </div>
  );
}
