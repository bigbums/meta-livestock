import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext';

export default function FeedTypeFormUpdate() {
  const { id } = useParams(); // Get the feed type ID from the URL
  const [feedType, setFeedType] = useState({ name: '', feed_type_desc: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AppContext); // Get the auth token
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedType = async () => {
      try {
        const response = await fetch(`/api/feed-types/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFeedType(data); // Set the data in state
          setLoading(false);
        } else {
          setError('Could not load feed type data');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedType();
  }, [id, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/feed-types/${id}`, {
        method: 'PUT', // Use PUT for updating data
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(feedType),
      });

      if (response.ok) {
        navigate('/modules/FeedTypes/FeedTypeFormList'); // Redirect after successful update
      } else {
        const errorData = await response.json();
        setError('Failed to update feed type: ' + errorData.message);
      }
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Feed Type</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Feed Type Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedType.name}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="feed_type_desc" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="feed_type_desc"
              name="feed_type_desc"
              value={feedType.feed_type_desc}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 p-2 rounded"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
}
