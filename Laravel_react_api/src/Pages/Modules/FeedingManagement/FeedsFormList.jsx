// File: ../Pages/Modules/Feeds/FeedsFormList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeedsFormList() {
  const [feeds, setFeeds] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await fetch('/api/feeds');
        const data = await response.json();

        if (response.ok) {
          setFeeds(data);
        } else {
          setError('Failed to fetch feeds');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeeds();
  }, []);

  return (
    <div className="feeds-list">
      <h2>Feeds</h2>
      {error && <div className="error">{error}</div>}

      <ul>
        {feeds.map((feed) => (
          <li key={feed.id}>
            {feed.name}
            <Link to={`/feeds/${feed.id}`}>View</Link>
            <Link to={`/feeds/${feed.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>

      <Link to="/feeds/create">Create New Feed</Link>
    </div>
  );
}
