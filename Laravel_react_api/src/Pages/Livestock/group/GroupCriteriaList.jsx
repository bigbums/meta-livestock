import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../../../Context/AppContext'; // Import AppContext if needed
import { Link } from 'react-router-dom'

export default function GroupCriteriaList () {
    const [groupCriteria, setGroupCriteria] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null)
    const { token } = useContext(AppContext); // Use token from AppContext if authentication is needed for delete
    
    useEffect(() => {
        const fetchGroupCriteria = async () => {
          try {
            const response = await fetch('/api/groups-criteria', {
              headers: {
                Authorization: `Bearer ${token}`, // Pass token if required
              },
            });
            const data = await response.json();
    
            if (response.ok) {
              setGroupCriteria(data);
            } else {
              console.error('API error:', data);
              setError('No available data');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchGroupCriteria();
      }, [token]);


      const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this feed type?');
        if (!confirmDelete) return;
    
        try {
          const response = await fetch(`/api/groups-criteria/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`, // Pass token if needed for delete
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            // Remove the deleted feed type from the state
            setGroupCriteria((prevGroupCriteria) => prevGroupCriteria.filter((groupCriteria) => groupCriteria.id !== id));
            console.log('deleted succesfully')
            setSuccess('Deleted Succesfully')
          } else {
            const data = await response.json();
            console.error('Failed to delete:', data);
            setError('Failed to delete Group Criteria');
          }
        } catch (error) {
          console.error('Delete error:', error);
          setError('Error deleting Group Criteria');
        }
      };
      const updateCriteria = (updatedCriteria) => {
        setCriteriaList((prevList) =>
          prevList.map((item) =>
            item.id === updatedCriteria.id ? updatedCriteria : item
          )
        );
      };
    
    
return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Group Criteria</h2>
      {success && <div className='text-green-500'>{success}</div>}
      {error && <div className="text-red-500">{error}</div>}

      {groupCriteria.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                {/* <th className="px-4 py-2 border">Group name</th> */}
                <th className="px-4 py-2 border">Criteria</th>
                <th className="px-4 py-2 border">Value</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupCriteria.map((groupCriteria) => (
                  <tr key={groupCriteria.id} className="hover:bg-gray-100">
                    {/* <td className="px-4 py-2 border">{groupCriteria.livestock_group_id || 'No description'}</td> */}
                    <td className="px-4 py-2 border">{groupCriteria.key || 'No description'}</td>
                  <td className="px-4 py-2 border">{groupCriteria.value}</td>
                  <td className="px-4 py-2 border text-center">
                    <Link
                      to={`/criteriadetails/${groupCriteria.id}`}
                      className="text-blue-500 hover:underline mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/criteriaedit/${groupCriteria.id}/edit`}
                      className="text-green-500 hover:underline mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(groupCriteria.id)}
                      className="text-red-500 hover:underline mx-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No feed types available</p>
      )}

      <div className="mt-4">
        <Link
          to="/criteriaform"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Criteria
        </Link>
      </div>
      <div className="mt-4">
        <Link
          to="/"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
