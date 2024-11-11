
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreedingProgramForm from './BreedingProgramForm';

const EditBreedingProgram = ({ onSubmit }) => {
    console.log("onSubmit prop:",onSubmit);
    const { id } = useParams(); // Extract id from the route
    const [programData, setProgramData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // Fetch the existing program data when the component mounts
    const fetchProgramData = async () => {
        try {
            const response = await fetch(`/api/breeding-programs/${id}`);
            if (!response.ok) throw new Error("Failed to fetch program data");
            const data = await response.json();
            setProgramData(data);
        } catch (error) {
            console.error("Error fetching program data:", error);
            setError("Failed to load program data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProgramData();
    }, [id]);

    const handleEditSubmit = async (updatedData) => {
        console.log("Submitting updated data:", updatedData); // Log the submitted data
        try {
            const response = await fetch(`/api/breeding-programs/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                console.log(errorData); // Log error details for debugging
                throw new Error('Failed to update breeding program');
            } else {
               const resp = await response.json()
               console.log(resp)
               navigate('/breeding-programs-list')
            }

            // Call the onSubmit prop after successful update
            // await onSubmit(); 
        } catch (error) {
            console.error("Error updating program:", error);
            setError("An error occurred while saving the program. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <BreedingProgramForm
            onSubmit={handleEditSubmit}
            initialData={programData}
        />
    );
};

export default EditBreedingProgram;