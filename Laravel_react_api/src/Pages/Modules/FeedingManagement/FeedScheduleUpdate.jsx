import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function FeedScheduleUpdate  ()  {
    const { id } = useParams(); // Get the feed type ID from the URL
    const [feedSchedules, setFeedSchedules] = useState(
        { 
            quantity: '', 
            approved_quantity: '',
            approver: '',
            location: '',
            freqency: '',
            occurrence: '',
            time_of_day: '',
        }
    );
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedSchedules = async () => {
          try {
            const response = await fetch(`/api/feed-schedules/${id}`,);
            const data = await response.json();
    
            if (response.ok) {
              setFeedSchedules(data); // Set the data in state
              setLoading(false);
            } else {
              setError('Could not load feed schedule data');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchFeedSchedules();
      }, [id]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedSchedules((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`/api/feed-schedules/${id}`, {
            method: 'PUT', // Use PUT for updating data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(feedSchedules),
          });
    
          if (response.ok) {
            navigate('/modules/FeedingManagement/feedschedulelist'); // Redirect after successful update
          } else {
            const errorData = await response.json();
            setError('Failed to update feed schedule: ' + errorData.message);
          }
        } catch (error) {
          setError('Error: ' + error.message);
        }
      };
    
      if (error) {
        return <div>{error}</div>;
      }
    

      return (
        <div className="feed-schedule-edit mb-4 border rounded-md border-dashed border-slate-400">
          <h2 className="font-bold text-2xl mb-4">Edit Feed Schedule</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Quantity</label>
              <input
                type="text"
                name="quantity"
                value={feedSchedules.quantity}
                onChange={handleInputChange}
                required
                className="border border-slate p-2"
              />
            </div>
            <div>
              <label>Approved Quantity</label>
              <input
                type="text"
                name="approved_quantity"
                value={feedSchedules.approved_quantity}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Approver</label>
              <input
                type="text"
                name="approver"
                value={feedSchedules.approver}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={feedSchedules.location}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Frequency</label>
              <input
                type="text"
                name="frequency"
                value={feedSchedules.frequency}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Occurence</label>
              <input
                type="text"
                name="occurrence"
                value={feedSchedules.occurrence}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Time Of Day</label>
              <input
                type="text"
                name="time_of_day"
                value={feedSchedules.time_of_day}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
              Update Feed Schedule
            </button>
          </form>
        </div>
      );
    }
    