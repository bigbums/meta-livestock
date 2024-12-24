import  { useState, useEffect } from 'react';
import PregnancyForm from './PregnancyForm';
import PregnancyList from './PregnancyList';
import EditPregnancy from './EditPregnancy';

const CreatePregnancy = () => {
    const [pregnancy, setPregnancies] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Define fetchPrograms function
    const fetchPregnancies = async () => {
        try {
            const response = await fetch('/api/pregnancy-records');
            if (!response.ok) throw new Error('Failed to fetch pregnancy-records');
            const data = await response.json();
            setPregnancies(data); // Update state with fetched cycles
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        }
    };

    // Fetch programs on component mount
    useEffect(() => {
        fetchPregnancies();
    }, []);

    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/pregnancy-records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchPregnancies(); // Refresh the estrus-cycle list after creation
                setMessage('pregnancy-record created successfully!');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create pregnancy-record');
            }
        } catch (error) {
            setError('Error occurred while creating pregnancy-record');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/pregnancy-records/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete pregnancy-record');

            await fetchPregnancies(); // Refresh the program list after deletion
        } catch (error) {
            console.error("Error deleting estrus-cycle:", error);
        }
    };

    return (
        <div>
            <h2>Create Estrus-cycle</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <PregnancyForm onSubmit={handleCreate} />
            <PregnancyList pregnancy={pregnancy} onDelete={handleDelete} />
            <EditPregnancy onSubmit={handleEditSubmit} />
        </div>
    );
};

export default CreatePregnancy;