// File: ../Pages/Modules/Feeds/FeedsFormUpdate.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FeedsFormUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    feed_type_id: '',
    amount: '',
    units_of_measure: '',
    description: ''
  });
  const [feedTypes, setFeedTypes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`/api/feeds/${id}`);
        const data = await response.json();

        if (response.ok) {
          setFormData({
            name: data.name,
            feed_type_id: data.feed_type_id,
            amount: data.amount,
            units_of_measure: data.units_of_measure,
            description: data.description
          });
        } else {
          setError('Failed to fetch feed details');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    const fetchFeedTypes = async () => {
      try {
        const response = await fetch('/api/feed-types');
        const data = await response.json();

        if (response.ok) {
          setFeedTypes(data);
        } else {
          setError('Failed to fetch feed types');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeed();
    fetchFeedTypes();
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
      const response = await fetch(`/api/feeds/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/feeds');
      } else {
        setError('Failed to update feed');
      }
    } catch (error) {
      setError('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feed-update">
      <h2>Update Feed</h2>
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
          Feed Type:
          <select
            name="feed_type_id"
            value={formData.feed_type_id}
            onChange={handleInputChange}
          >
            <option value="">Select Feed Type</option>
            {feedTypes.map((feedType) => (
              <option key={feedType.id} value={feedType.id}>
                {feedType.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Amount:
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Units of Measure:
          <input
            type="text"
            name="units_of_measure"
            value={formData.units_of_measure}
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
          {loading ? 'Updating...' : 'Update Feed'}
        </button>
      </form>
    </div>
  );
}
