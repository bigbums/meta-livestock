
import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { Link } from 'react-router-dom';

export default function FeedDistributionList() {
  const [FeedDistribution, setFeedDistribution] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { token } = useContext(AppContext);

  useEffect(() => {
    const fetchFeedDistribution = async () => {
      try {
        const response = await fetch('/api/feed-distribution', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFeedDistribution(data);
        } else {
          setError('No available data');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedDistribution();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feed type?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/feed-distribution/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setFeedDistribution((prevFeedDistribution) =>
          prevFeedDistribution.filter((item) => item.id !== id)
        );
        setSuccess('Deleted Successfully');
      } else {
        setError('Failed to delete Feed Distribution');
      }
    } catch (error) {
      setError('Error deleting Feed Distribution');
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Feed Distribution</h2>
      {success && <div className="mb-4 text-green-600 font-semibold">{success}</div>}
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {FeedDistribution.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 border-b">Feed Distribution</th>
                <th className="py-3 px-6 border-b">Livestock Group ID</th>
                <th className="py-3 px-6 border-b">Livestock ID</th>
                <th className="py-3 px-6 border-b">Distribution Time</th>
                <th className="py-3 px-6 border-b">Actual Quantity Distributed</th>
                <th className="py-3 px-6 border-b">Variance</th>
                <th className="py-3 px-6 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {FeedDistribution.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{item.id || 'No description'}</td>
                  <td className="py-3 px-6">{item.livestock_group_id}</td>
                  <td className="py-3 px-6">{item.livestock_id}</td>
                  <td className="py-3 px-6">{item.distribution_time}</td>
                  <td className="py-3 px-6">{item.actual_quantity_distributed}</td>
                  <td className="py-3 px-6">{item.variance}</td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <Link
                        to={`/feedDistributionDetails/${item.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                      <Link
                        to={`/feedDistribution/${item.id}/edit`}
                        className="text-green-600 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No feed types available</p>
      )}

      <div className="flex gap-4 mt-6">
        <Link
          to="/feedDistributionForm"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Feed Distribution
        </Link>
        <Link
          to="/"
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
