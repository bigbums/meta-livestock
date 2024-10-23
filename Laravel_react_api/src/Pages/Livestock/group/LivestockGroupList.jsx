import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function LivestockGroupList() {
  const [livestockGroups, setLivestockGroups] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch livestock groups when component mounts
  useEffect(() => {
    async function fetchLivestockGroups() {
      try {
        const response = await fetch('/api/livestock-groups');
        if (response.ok) {
          const data = await response.json();
          setLivestockGroups(data);
            // Set the browser title to the group name dynamically
            document.title = `Group: ${data.name}`;  // Set title to the livestock group name
            
        } else {
          setMessage('Failed to fetch livestock groups');
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      }
    }
    fetchLivestockGroups();
  }, []);

  // Delete group handler
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/livestock-groups/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Group deleted successfully!');
        setLivestockGroups(livestockGroups.filter(group => group.id !== id)); // Remove group from UI
      } else {
        setMessage('Failed to delete group');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  // Render list of livestock groups
  return (
    <div className="livestock-group-list-container">
      <h2>Livestock Group List</h2>
      {message && <p>{message}</p>}

      {livestockGroups.length === 0 ? (
        <p>No livestock groups available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {livestockGroups.map((group) => (
              <tr key={group.id}>
                <td>{group.name}</td>
                <td>{group.description}</td>
                <td>
                  <Link
                    to={`/livestockgroupdetails/${group.id}`}
                    className="text-blue-600"
                  >

                    View
                  </Link>
                  <Link
                      to={`/livestockgroupedit/${group.id}/edit`}
                    className="text-green-600 ml-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="text-red-600 ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link to="/livestockgroupform" className="nav-link c-white bg-black float-end" style={{ color: 'white' }}>
        Add Livestock Group
      </Link>

    </div>
  );
}

