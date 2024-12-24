import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EstrusCycleList = ({ onDelete }) => {
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchCycles = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/estrus-cycles');
            if (!res.ok) throw new Error('Failed to fetch estrus cycles');
            const data = await res.json();
            setCycles(data);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCycles();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this estrus cycle?')) {
            await onDelete(id);
            fetchCycles(); // Refresh the list after deletion
        }
    };

    const filteredCycles = cycles.filter((cycle) => {
        const activityLevel = cycle.activity_level ? cycle.activity_level.toString() : '';
        const temperatureChange = cycle.temperature_change ? cycle.temperature_change.toString() : '';
        return (
            activityLevel.includes(searchTerm.toLowerCase()) ||
            temperatureChange.includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2>Estrus Cycles</h2>

            {cycles.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">ID / Tag</th>
                                <th className="px-4 py-2 border">Activity Level</th>
                                <th className="px-4 py-2 border">Temperature Change</th>                               
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cycles.map((cycle) => (  // Render without filtering
                                <tr key={cycle.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{cycle.livestock_id || 'No description'}</td>
                                    <td className="px-4 py-2 border">{cycle.activity_level || 'No description'}</td>
                                    <td className="px-4 py-2 border">{cycle.temperature_change || 'No description'}</td>
                                    <td className="px-4 py-2 border">{cycle.start_date || 'No description'}</td>
                                    <td className="px-4 py-2 border">{cycle.end_date || 'No description'}</td>                                    
                                    <td className="px-4 py-2 border text-center">
                                        <Link
                                            to={`/estrus-cycles-details/${cycle.id}`}
                                            className="text-blue-500 hover:underline mx-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/estrus-cycles/${cycle.id}/edit`}
                                            className="text-green-500 hover:underline mx-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cycle.id)}
                                            className="text-red-500 hover:underline mx-2"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No Estrus Cycles Available</p>
            )}

            <div className="mt-4">
                <Link
                    to="/estrus-cycles-form"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Create New Estrus Cycle
                </Link>
            </div>

            <div className="mt-4">
                <Link
                    to="/breeding"
                    className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Go Back
                </Link>
            </div>
        </div>
    );
};

export default EstrusCycleList;
