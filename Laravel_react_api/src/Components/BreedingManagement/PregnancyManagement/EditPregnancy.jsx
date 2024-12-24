import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PregnancyForm from './PregnancyForm';

const EditPregnancy = ({ onSubmit }) => {
    const { id } = useParams(); // Extract id from the route
    const [pregnancyData, setPregnancyData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch the existing estrus data when the component mounts
    const fetchPregnancyData = async () => {
        try {
            const response = await fetch(`/api/pregnancy-records/${id}`);
            if (!response.ok) throw new Error("Failed to fetch pregnancy data");
            const data = await response.json();
            setPregnancyData(data);
        } catch (error) {
            console.error("Error fetching pregnancy data:", error);
            setError("Failed to load pregnancy data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPregnancyData();
    }, [id]);

    const handleEditSubmit = async (updatedData) => {
        try {
            const response = await fetch(`/api/pregnancy-records/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data
            });

            if (!response.ok) throw new Error('Failed to update pregnancy record');
            navigate('/pregnancy-records-list');
        } catch (error) {
            console.error("Error updating pregnancy record:", error);
            setError("An error occurred while saving the pregnancy record. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PregnancyForm
            onSubmit={handleEditSubmit}
            initialData={pregnancyData} // Pass initialData to the form
        />
    );
};

export default EditPregnancy;
