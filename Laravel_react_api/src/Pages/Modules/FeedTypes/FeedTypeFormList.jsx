
// import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';

// export default function FeedTypeFormList() {
//   const [feedTypes, setFeedTypes] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeedTypes = async () => {
//       try {
//         const response = await fetch('/api/feed-types');
//         const data = await response.json();
//         console.log(data)

//         if (response.ok) {
//           setFeedTypes(data);
//         } else {
//           // setError('No available data');
//           console.error('API error:', data); // Log API error response
//           setError('No available data');
//         }
//       } catch (error) {
//         setError('Error: ' + error.message);
//       }
//     };

//     fetchFeedTypes();
//   }, []);



//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Feed Types</h2>
//       {error && <div className="text-red-500">{error}</div>}

//       {feedTypes.length > 0 ? (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 border">Feed Type Name</th>
//                 <th className="px-4 py-2 border">Description</th>
//                 <th className="px-4 py-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {feedTypes.map((feedType) => (
//                 <tr key={feedType.id} className="hover:bg-gray-100">
//                   <td className="px-4 py-2 border">{feedType.name}</td>
//                   <td className="px-4 py-2 border">{feedType.feed_type_desc || 'No description'}</td>
//                   <td className="px-4 py-2 border text-center">
//                     <Link
//                       to={`/modules/FeedTypes/FeedTypeFormDetails/${feedType.id}`}
//                       className="text-blue-500 hover:underline mx-2"
//                     >
//                       View
//                     </Link>
//                     <Link
//                       to={`/feed-types/${feedType.id}/edit`}
//                       className="text-green-500 hover:underline mx-2"
//                     >
//                       Edit
//                     </Link>
//                     <Link
//                       to={`/feed-types/${feedType.id}/edit`}
//                       className="text-red-500 hover:underline mx-2"
//                     >
//                       Delete
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p className="text-gray-500">No feed types available</p>
//       )}

//       <div className="mt-4">
//         <Link
//           to="/modules/FeedTypes/FeedTypeForm"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Create New Feed Type
//         </Link>
//       </div>
//       <div className="mt-4">
//         <Link
//           to="/"
//           className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Go home
//         </Link>
//       </div>
//     </div>
//   );}

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext'; // Import AppContext if needed

export default function FeedTypeFormList() {
  const [feedTypes, setFeedTypes] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AppContext); // Use token from AppContext if authentication is needed for delete

  useEffect(() => {
    const fetchFeedTypes = async () => {
      try {
        const response = await fetch('/api/feed-types', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token if required
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFeedTypes(data);
        } else {
          console.error('API error:', data);
          setError('No available data');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedTypes();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feed type?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/feed-types/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Pass token if needed for delete
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted feed type from the state
        setFeedTypes((prevFeedTypes) => prevFeedTypes.filter((feedType) => feedType.id !== id));
      } else {
        const data = await response.json();
        console.error('Failed to delete:', data);
        setError('Failed to delete feed type');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Error deleting feed type');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Feed Types</h2>
      {error && <div className="text-red-500">{error}</div>}

      {feedTypes.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Feed Type Name</th>
                <th className="px-4 py-2 border">Description</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedTypes.map((feedType) => (
                <tr key={feedType.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{feedType.name}</td>
                  <td className="px-4 py-2 border">{feedType.feed_type_desc || 'No description'}</td>
                  <td className="px-4 py-2 border text-center">
                    <Link
                      to={`/modules/FeedTypes/FeedTypeFormDetails/${feedType.id}`}
                      className="text-blue-500 hover:underline mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/feed-types/${feedType.id}/edit`}
                      className="text-green-500 hover:underline mx-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(feedType.id)}
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
          to="/modules/FeedTypes/FeedTypeForm"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Feed Type
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
