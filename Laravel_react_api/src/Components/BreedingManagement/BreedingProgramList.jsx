import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BreedingProgramList = ({ onDelete }) => {
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPrograms = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/breeding-programs');
            if (!res.ok) throw new Error('Failed to fetch programs');
            const data = await res.json();
            setPrograms(data);
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this program?')) {
            await onDelete(id);
            fetchPrograms(); // Refresh the list after deletion
        }
    };

    const filteredPrograms = programs.filter(program =>
        program.program_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.objective.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2>Breeding Programs</h2>

            {programs.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 border">Program Name</th>
                                <th className="px-4 py-2 border">Objective</th>
                                <th className="px-4 py-2 border">Start Date</th>
                                <th className="px-4 py-2 border">End Date</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPrograms.map((program) => (
                                <tr key={program.id} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border">{program.program_name}</td>
                                    <td className="px-4 py-2 border">{program.description}</td>
                                    <td className="px-4 py-2 border">{program.start_date || 'No description'}</td>
                                    <td className="px-4 py-2 border">{program.end_date || 'No description'}</td>
                                    <td className="px-4 py-2 border text-center">
                                        <Link
                                            to={`/breeding-details/${program.id}`}
                                            className="text-blue-500 hover:underline mx-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            to={`/breeding-programs/${program.id}/edit`}
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
          to="/breeding-programs-form"
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

export default BreedingProgramList;