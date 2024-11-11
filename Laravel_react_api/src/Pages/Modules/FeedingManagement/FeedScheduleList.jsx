import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { AppContext } from '../../../Context/AppContext'; 


export default function FeedScheduleList() {
  const [feedSchedules, setFeedSchedules] = useState([]);
  const [error, setError] = useState(null);
  const { token } = useContext(AppContext); // Use token from AppContext if authentication is needed for delete

  useEffect(() => {
    const fetchFeedSchedules = async () => {
      try {
        const response = await fetch('/api/feed-schedules', {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token if required
          },
        });
        const data = await response.json();

        if (response.ok) {
          setFeedSchedules(data);
          console.log(data);
          
        } else {
          console.error('API error:', data);
          setError('No available data');
        }
      } catch (error) {
        setError('Error: ' + error.message);
      }
    };

    fetchFeedSchedules();
  }, [token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feed type?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/feed-schedules/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Pass token if needed for delete
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove the deleted feed type from the state
        setFeedSchedules((prevFeedSchedules) => prevFeedSchedules.filter((feedType) => feedType.id !== id));
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
      <h2 className="text-2xl font-bold mb-4">Feed Schedules</h2>
      {error && <div className="text-red-500">{error}</div>}

      {feedSchedules.length > 0 ? (
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Approved Qty</th>
                <th className="px-4 py-2 border">Approver</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Frequency</th>
                <th className="px-4 py-2 border">Occurence</th>
                <th className="px-4 py-2 border">Time of day</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedSchedules.map((feedType) => (

                <tr key={feedType.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border">{feedSchedules[0].quantity}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].approved_quantity || 'No description'}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].approver || 'No description'}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].feed_location || 'No description'}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].frequency || 'No description'}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].occurrence || 'No description'}</td>
                  <td className="px-4 py-2 border">{feedSchedules[0].time_of_day || 'No description'}</td>
                  
                  <td className="px-4 py-2 border text-center">
                    <Link
                      to={`/feedscheduleDetails/${feedType.id}`}
                      className="text-blue-500 hover:underline mx-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/feedScheduleUpdate/${feedType.id}/edit`}
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
          to="/modules/feeding-management/feed-schedule-form"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Feed Schedule
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












// const FeedScheduleList = () => {
//   const [feedSchedules, setFeedSchedules] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch feed schedules when component mounts
//   useEffect(() => {
//     const fetchFeedSchedules = async () => {
//       try {
//         const response = await fetch("/api/feed-schedules");
//         if (!response.ok) throw new Error("Failed to fetch feed schedules");
//         const data = await response.json();
//         setFeedSchedules(data);
//       } catch (error) {
//         console.error("Error fetching feed schedules:", error);
//         setMessage("Error fetching feed schedules.");
//       }
//     };

//     fetchFeedSchedules();
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6 text-center">Feed Schedule List</h2>
      
//       {message && <p className="text-red-600">{message}</p>}

//       {feedSchedules.length > 0 ? (
//         <table className="min-w-full border-collapse border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="border border-gray-300 p-2 text-left">Livestock Group</th>
//               <th className="border border-gray-300 p-2 text-left">Feed</th>
//               <th className="border border-gray-300 p-2 text-left">Quantity</th>
//               <th className="border border-gray-300 p-2 text-left">Approved Quantity</th>
//               <th className="border border-gray-300 p-2 text-left">Approver</th>
//               <th className="border border-gray-300 p-2 text-left">Feed Location</th>
//               <th className="border border-gray-300 p-2 text-left">Frequency</th>
//               <th className="border border-gray-300 p-2 text-left">Time of Day</th>
//               <th className="border border-gray-300 p-2 text-left">Occurrence</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedSchedules.map((schedule) => (
//               <tr key={schedule.id} className="hover:bg-gray-100">
//                 <td className="border border-gray-300 p-2">{schedule.livestock_group_id}</td>
//                 <td className="border border-gray-300 p-2">{schedule.feed_type_id}</td>
//                 <td className="border border-gray-300 p-2">{schedule.quantity}</td>
//                 <td className="border border-gray-300 p-2">{schedule.approved_quantity}</td>
//                 <td className="border border-gray-300 p-2">{schedule.approver}</td>
//                 <td className="border border-gray-300 p-2">{schedule.feed_location}</td>
//                 <td className="border border-gray-300 p-2">{schedule.frequency}</td>
//                 <td className="border border-gray-300 p-2">{schedule.time_of_day}</td>
//                 <td className="border border-gray-300 p-2">{schedule.occurrence}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="text-center text-gray-500">No feed schedules available.</p>
//       )}
//     </div>
//   );
// };

// export default FeedScheduleList;