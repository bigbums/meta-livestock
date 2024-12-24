import  { useState, useEffect } from 'react';
import EstrusCycleForm from './EstrusCycleForm';
import EstrusCycleList from './EstrusCycleList';
import EditEstrusCycle from './EditEstrusCycle';

const CreateEstrusCycle = () => {
    const [cycles, setCycles] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Define fetchPrograms function
    const fetchCycles = async () => {
        try {
            const response = await fetch('/api/estrus-cycles');
            if (!response.ok) throw new Error('Failed to fetch estrus-cycle');
            const data = await response.json();
            setCycles(data); // Update state with fetched cycles
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        }
    };

    // Fetch programs on component mount
    useEffect(() => {
        fetchCycles();
    }, []);

    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/estrus-cycles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchCycles(); // Refresh the estrus-cycle list after creation
                setMessage('Estrus-cycle created successfully!');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create estrus-cycle');
            }
        } catch (error) {
            setError('Error occurred while creating estrus-cycle');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/estrus-cycles/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete breeding program');

            await fetchCycles(); // Refresh the program list after deletion
        } catch (error) {
            console.error("Error deleting estrus-cycle:", error);
        }
    };

    return (
        <div>
            <h2>Create Estrus-cycle</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <EstrusCycleForm onSubmit={handleCreate} />
            <EstrusCycleList cycles={cycles} onDelete={handleDelete} />
            <EditEstrusCycle onSubmit={handleEditSubmit} />
        </div>
    );
};

export default CreateEstrusCycle;