// File: ../Pages/Modules/FeedType/FeedTypeFormUpdate.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FeedTypeFormUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedType = async () => {
      try {
        const response = await fetch(`/api/feed-types/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            name: data.name,
            description: data.description
          });
        } else {
          setError('Failed to fetch feed type details');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedType();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/feed-types/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/feed-types');
      } else {
        setError('Failed to update feed type');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-type-update">
      <h2>Update Feed Type</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Feed Type'}
        </button>
      </form>
    </div>
  );
}
