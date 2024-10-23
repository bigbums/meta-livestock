import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";


const FeedScheduleForm = () => {
  const [livestockGroupId, setLivestockGroupId] = useState("");
  const [feedId, setFeedId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [approvedQuantity, setApprovedQuantity] = useState("");
  const [approver, setApprover] = useState("");
  const [feedLocation, setFeedLocation] = useState("");
  const [frequency, setFrequency] = useState("");
  const [timeOfDay, setTimeOfDay] = useState("");
  const [occurence, setOccurence] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AppContext);
  const [message, setMessage] = useState("");
  const [feeds, setFeeds] = useState([]);
  const [livestockGroups, setLivestockGroups] = useState([]);

  // Fetch feeds and livestock groups when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedsResponse = await fetch("/api/feed-types");
        if (!feedsResponse.ok) throw new Error("Failed to fetch feeds");
        const feedsData = await feedsResponse.json();
        setFeeds(feedsData);

        const livestockGroupsResponse = await fetch("/api/livestock-groups");
        if (!livestockGroupsResponse.ok) throw new Error("Failed to fetch livestock groups");
        const livestockGroupsData = await livestockGroupsResponse.json();
        setLivestockGroups(livestockGroupsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/feed-schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          livestock_group_id: livestockGroupId,
          feed_type_id: feedId,
          quantity,
          approved_quantity: approvedQuantity,
          approver,
          feed_location: feedLocation,
          frequency,
          time_of_day: timeOfDay,
          occurrence: occurence,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMessage("Feed schedule created successfully!");
        resetForm();
        navigate('/modules/FeedingManagement/FeedScheduleList'); 
           
      } else {
        const errorData = await response.json();
        console.log(errorData);
        throw new Error(errorData.errors ? errorData.errors : "Error creating feed schedule.");
      }
    } catch (error) {
      console.error("Error creating feed schedule:", error);
      setMessage("Error creating feed schedule.");
    }
  };

  // Reset form fields after successful submission
  const resetForm = () => {
    setLivestockGroupId("");
    setFeedId("");
    setQuantity("");
    setApprovedQuantity("");
    setApprover("");
    setFeedLocation("");
    setFrequency("");
    setTimeOfDay("");
    setOccurence("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Feed Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Livestock Group:</label>
          <select 
            value={livestockGroupId} 
            onChange={(e) => setLivestockGroupId(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          >
            <option value="">Select Livestock Group</option>
            {livestockGroups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Feed:</label>
          <select 
            value={feedId} 
            onChange={(e) => setFeedId(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          >
            <option value="">Select Feed</option>
            {feeds.map((feed) => (
              <option key={feed.id} value={feed.id}>
                {feed.feed_type_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity:</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Approved Quantity:</label>
          <input 
            type="number" 
            value={approvedQuantity} 
            onChange={(e) => setApprovedQuantity(e.target.value)} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Approver:</label>
          <input 
            type="text" 
            value={approver} 
            onChange={(e) => setApprover(e.target.value)} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Feed Location:</label>
          <input 
            type="text" 
            value={feedLocation} 
            onChange={(e) => setFeedLocation(e.target.value)} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Frequency:</label>
          <input 
            type="text" 
            value={frequency} 
            onChange={(e) => setFrequency(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Time of Day:</label>
          <input 
            type="time" 
            value={timeOfDay} 
            onChange={(e) => setTimeOfDay(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Occurrence:</label>
          <input 
            type="text" 
            value={occurence} 
            onChange={(e) => setOccurence(e.target.value)} 
            required 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Feed Schedule
        </button>
      </form>

      {message && (
        <p className={`mt-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default FeedScheduleForm;