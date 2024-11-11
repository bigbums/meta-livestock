import { useEffect, useState } from 'react';
import BreedingGroupForm from './BreedingGroupForm';
import BreedingGroupManagerList from './BreedingGroupManagerList';
import EditBreedingGroup from './EditBreedingGroup';

const BreedingGroupManager = () => {
    const [livestockOptions, setLivestockOptions] = useState([]);
    const [breedingGroup, setBreedingGroup] = useState([])
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    useEffect(() => {
        const fetchLivestockOptions = async () => {
            try {
                const response = await fetch('/api/livestock/list'); // Adjust this endpoint as necessary
                if (!response.ok) throw new Error('Failed to fetch livestock options');
                const data = await response.json();
                setLivestockOptions(data);
            } catch (error) {
                console.error('Error fetching livestock options:', error);
            }
        };

        fetchLivestockOptions();
    }, []);

    const handleSubmit = (data) => {
        console.log('Breeding Group Data:', data);
        // Handle submission logic here
    };

    const fetchBreedingGroup = async () => {
        try {
            const response = await fetch('/api/breeding-group');
            if (!response.ok) throw new Error('Failed to fetch group');
            const data = await response.json();
            setBreedingGroup(data); // Update state with fetched programs
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        }
    };

    // Fetch programs on component mount
    useEffect(() => {
        fetchBreedingGroup();
    }, []);



    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/breeding-groups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchBreedingGroup(); // Refresh the program list after creation
                setMessage('Breeding Program created successfully!');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create breeding program');
            }
        } catch (error) {
            setError('Error occurred while creating breeding program');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/breeding-programs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete breeding program');

            await fetchPrograms(); // Refresh the program list after deletion
        } catch (error) {
            console.error("Error deleting program:", error);
        }
    };


    return (
        <div>
            <h2>Create Breeding Group</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <BreedingGroupForm livestockOptions={livestockOptions} onSubmit={handleCreate} />
            <BreedingGroupManagerList programs={breedingGroup}  onDelete={handleDelete}            />
            <EditBreedingGroup onSubmit={handleEditSubmit}/>
        </div>
    );
};

export default BreedingGroupManager;