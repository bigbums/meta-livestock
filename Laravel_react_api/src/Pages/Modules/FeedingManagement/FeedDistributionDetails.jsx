import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


export default function FeedDistributionDetails () {
    const { id } = useParams();
    const [FeedDistribution, setFeedDistribution] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeedDistribution = async () => {
          try {
            const response = await fetch(`/api/feed-distribution/${id}`);
            const data = await response.json();
            console.log(data); 
    
            if (response.ok) {
              setFeedDistribution(data);
            } else {
              setError('Failed to fetch feed distribution details');
            }
          } catch (error) {
            setError('Error: ' + error.message);
          }
        };
    
        fetchFeedDistribution();
      }, [id]);

      if (error) return <div>{error}</div>;
      if (!FeedDistribution) return <div>Loading feed distribution details...</div>;
    



      return (
        <div className="container mx-auto p-6">
          <h2 className="text-2xl font-bold mb-6">Feed Distribution Details</h2>
    
          {error && <div className="text-red-500 mb-4">{error}</div>}
    
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Feed Distributrion ID:</strong>
              <p className="text-lg">{FeedDistribution.id || 'N/A'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Livestock Group ID:</strong>
              <p className="text-lg">{FeedDistribution.livestock_group_id || 'No description available'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Livestock ID:</strong>
              <p className="text-lg">{FeedDistribution.livestock_id || 'No description available'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Distribution Time:</strong>
              <p className="text-lg">{FeedDistribution.distribution_time || 'No description available'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Actual Quantity Distributed:</strong>
              <p className="text-lg">{FeedDistribution.actual_quantity_distributed || 'No description available'}</p>
            </div>
    
            <div className="flex mb-4">
              <strong className="text-gray-700 mr-5">Variance:</strong>
              <p className="text-lg">{FeedDistribution.variance || 'No description available'}</p>
            </div>
    
          </div>
    
          <div className="mt-4">
            <Link
              to="/feedDistributionList"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              previous page
            </Link>
          </div>
    
        </div>
      )
    }
    