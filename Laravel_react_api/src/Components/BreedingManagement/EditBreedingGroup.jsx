import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreedingGroupForm from './BreedingGroupForm';

const EditBreedingGroup = ({ onSubmit }) => {
    const { id } = useParams(); // Extract id from the route
    const [groupData, setGroupData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    // const fetchGroupData = async () => {
    //     try {
    //         const response = await fetch(`/api/breeding-groups/${id}`);
    //         if (!response.ok) throw new Error("Failed to fetch group data");
    //         const data = await response.json();
    //         setGroupData(data);
    //     } catch (error) {
    //         console.error("Error fetching group data:", error);
    //         setError("Failed to load group data.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const fetchGroupData = async () => {
        try {
            const response = await fetch(`/api/breeding-groups/${id}`);
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error details:", errorData);
                throw new Error("Failed to fetch group data");
            }
            const data = await response.json();
            setGroupData(data);
        } catch (error) {
            console.error("Error fetching group data:", error);
            setError("Failed to load group data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupData();
    }, [id]);

    const handleEditSubmit = async (updatedData) => {
        console.log("Submitting updated data:", updatedData); // Log the submitted data
        try {
            const response = await fetch(`/api/breeding-groups/${id}`, {
                method: 'PUT', // Use PUT for updating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData), // Send updated data
            });

            if (!response.ok) {
                const errorData = await response.json(); 
                console.log(errorData); // Log error details for debugging
                throw new Error('Failed to update breeding group');
            } else {
               const resp = await response.json()
               console.log(resp)
               navigate('/breeding-group-list')
            }

            // Call the onSubmit prop after successful update
            // await onSubmit(); 
        } catch (error) {
            console.error("Error updating group:", error);
            setError("An error occurred while saving the group. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;



  return (
    <div>
    <BreedingGroupForm
    onSubmit={handleEditSubmit}
    initialData={groupData}

    />
        
    </div>
)
}

export default EditBreedingGroup