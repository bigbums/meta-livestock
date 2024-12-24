import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EstrusCycleForm from './EstrusCycleForm';

const EditEstrusCycle = ({ onSubmit }) => {
    const { id } = useParams(); // Extract id from the route
    const [estrusData, setEstrusData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the existing estrus data when the component mounts
    const fetchEstrusData = async () => {
        try {
            const response = await fetch(`/api/estrus-cycles/${id}`);
            if (!response.ok) throw new Error("Failed to fetch estrus data");
            const data = await response.json();
            setEstrusData(data);
        } catch (error) {
            console.error("Error fetching estrus data:", error);
            setError("Failed to load estrus data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstrusData();
    }, [id]);

    const handleEditSubmit = async (updatedData) => {
        try {
            const response = await fetch(`/api/estrus-cycles/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data
            });

            if (!response.ok) throw new Error('Failed to update estrus cycle');
            navigate('/estrus-cycles-list');
        } catch (error) {
            console.error("Error updating estrus cycle:", error);
            setError("An error occurred while saving the estrus cycle. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <EstrusCycleForm
            onSubmit={handleEditSubmit}
            initialData={estrusData} // Pass initialData to the form
        />
    );
};

export default EditEstrusCycle;
