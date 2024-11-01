import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


export default function FeedDistributionUpdate  ()  {
    const { id } = useParams(); // Get the feed type ID from the URL
    const [FeedDistribution, setFeedDistribution] = useState(
        { 
            feed_distribution_id: '', 
            livestock_group_livestock: '',
            livestock_id: '',
            distribution_time: '',
            actual_quantity_distributed: '',
            variance: '',
        }
    );
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedDistribution = async () => {
          try {
            const response = await fetch(`/api/feed-distribution/${id}`,);
            const data = await response.json();
    
            if (response.ok) {
              setFeedDistribution(data); // Set the data in state
            } else {
              setError('Could not load feed distribution data');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchFeedDistribution();
      }, [id]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedDistribution((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`/api/feed-distribution/${id}`, {
            method: 'PUT', // Use PUT for updating data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(FeedDistribution),
          });
    
          if (response.ok) {
            navigate('/feedDistributionlist'); // Redirect after successful update
          } else {
            const errorData = await response.json();
            setError('Failed to update feed distribution: ' + errorData.message);
          }
        } catch (error) {
          setError('Error: ' + error.message);
        }
      };
    
      if (error) {
        return <div>{error}</div>;
      }


      return (
        <div className="feed-distribution-edit mb-4 border rounded-md border-dashed border-slate-400">
          <h2 className="font-bold text-2xl mb-4">Edit Feed Distribution</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Feed Distribution ID</label>
              <input
                type="text"
                name=""
                value={FeedDistribution.id}
                onChange={handleInputChange}
                required
                className="border border-slate p-2"
              />
            </div>
            <div>
              <label>Livestock Group</label>
              <input
                type="text"
                name=""
                value={FeedDistribution.livestock_group_id}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Livestock ID</label>
              <input
                type="text"
                name=""
                value={FeedDistribution.livestock_id}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Distribution Time</label>
              <input
                type="text"
                name="distribution_time"
                value={FeedDistribution.distribution_time}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>Actual Quantity Distributed</label>
              <input
                type="text"
                name="actual_quantity_distributed"
                value={FeedDistribution.actual_quantity_distributed}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <div>
              <label>variance</label>
              <input
                type="text"
                name="variance"
                value={FeedDistribution.variance}
                onChange={handleInputChange}
                required
                className="border border-slate-300 p-2"
              />
            </div>
            <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">
              Update Feed Distribution
            </button>
          </form>
        </div>
      );
    }
    