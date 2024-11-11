import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function BreedingGroupManagerList  () {
    const [breedingGroup, setBreedingGroup] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');



    const fetchGroupManager = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/breeding-groups');
            if (!res.ok) throw new Error('Failed to fetch breeding group');
            const data = await res.json();
            setBreedingGroup(data);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroupManager();
    }, []);
    

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this group?')) {
            await onDelete(id);
            fetchGroupManager(); // Refresh the list after deletion
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const filteredPrograms = breedingGroup.filter(program =>
        (program.group_type && program.group_type.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (program.notes && program.notes.toLowerCase().includes(searchTerm.toLowerCase()))
    );




    return (
        <div className="container mx-auto p-4">
            <h2>Breeding Groups</h2>

            {breedingGroup.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Breeding Name</th>
                                <th className="px-4 py-2 border">GroupType</th>
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                                <th className="px-4 py-2 border">Male Count</th>
                                <th className="px-4 py-2 border">Female Count</th>
                                <th className="px-4 py-2 border">Location</th>
                                <th className="px-4 py-2 border">Notes</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPrograms.map((program) => (
                                <tr key={program.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{program.breeding_group_name}</td>
                                    <td className="px-4 py-2 border">{program.group_type}</td>
                                    <td className="px-4 py-2 border flex">{program.start_date || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.end_date || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.male_count || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.female_count || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.location || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.notes || 'No description'}</td>
                                    <td className="px-4 py-2 border text-center flex">
                                        <Link
                                            to={`/breeding-group/${program.id}`}
                                            className="text-blue-500 hover:underline mx-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/breeding-group/${program.id}/edit`}
                                            className="text-green-500 hover:underline mx-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(program.id)}
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
                <p className="text-gray-500">No Breeding Programs available</p>
            )}



        <div className="mt-4">
        <Link
          to="/breeding-group-form"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Breeding Program
        </Link>
      </div>

        <div className="mt-4">
        <Link
          to="/breeding"
          className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
         go back
        </Link>
      </div>

        </div>
    );
};

