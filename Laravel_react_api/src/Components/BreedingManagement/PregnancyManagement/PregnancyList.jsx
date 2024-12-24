import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PregnancyList = ({ onDelete }) => {
    const [pregnancy, setPregnancies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPregnancies = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/pregnancy-records');
            if (!res.ok) throw new Error('Failed to fetch pregnancy records');
            const data = await res.json();
            setPregnancies(data);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPregnancies();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this pregnancy record?')) {
            await onDelete(id);
            fetchPregnancies(); // Refresh the list after deletion
        }
    };

    // const filteredPregnancies = pregnancy.filter((pregnancy) => {
    //     const activityLevel = pregnancy.activity_level ? pregnancy.activity_level.toString() : '';
    //     const temperatureChange = pregnancy.temperature_change ? pregnancy.temperature_change.toString() : '';
    //     return (
    //         activityLevel.includes(searchTerm.toLowerCase()) ||
    //         temperatureChange.includes(searchTerm.toLowerCase())
    //     );
    // });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2>Pregnancy</h2>

            {pregnancy.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">ID / Tag</th>
                                <th className="px-4 py-2 border">Breeding Date</th>
                                <th className="px-4 py-2 border">Status</th>                               
                                <th className="px-4 py-2 border">Detection Method</th>
                                <th className="px-4 py-2 border">Detection Date</th>
                                <th className="px-4 py-2 border">Expected Delivery Date</th>
                                <th className="px-4 py-2 border">Notes</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pregnancy.map((cycle) => (  // Render without filtering
                                <tr key={cycle.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{pregnancy.livestock_id || 'No description'}</td>
                                    <td className="px-4 py-2 border">{pregnancy.breeding_date || 'No description'}</td>
                                    <td className="px-4 py-2 border">{pregnancy.pregnancy_status || 'No description'}</td>
                                    <td className="px-4 py-2 border">{pregnancy.detection_method || 'No description'}</td>
                                    <td className="px-4 py-2 border">{pregnancy.detection_date || 'No description'}</td>                                    
                                    <td className="px-4 py-2 border">{pregnancy.expected_delivery_date || 'No description'}</td> 
                                    <td className="px-4 py-2 border">{pregnancy.notes || 'No description'}</td> 
                                    <td className="px-4 py-2 border text-center">
                                        <Link
                                            to={`/pregnancy-records-details/${pregnancy.id}`}
                                            className="text-blue-500 hover:underline mx-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/pregnancy-records/${pregnancy.id}/edit`}
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
                <p className="text-gray-500">No Pregnacy is Recorded</p>
            )}

            <div className="mt-4">
                <Link
                    to="/estrus-cycles-form"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                   Record New Pregnancy
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

export default PregnancyList;
