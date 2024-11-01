import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Show() {
    const { id } = useParams(); // Get livestock id from URL params
    const navigate = useNavigate();
    const { user, token } = useContext(AppContext); // Get user and token from context

    const [livestock, setLivestock] = useState(null); // Livestock state
    const [loading, setLoading] = useState(true); // Loading state to manage data fetching
    const [error, setError] = useState(null); // Error state to manage error messages

    // Fetch livestock details
    async function getLivestocks() {
        try {
            const res = await fetch(`/api/livestocks/detail/${id}`);
            const data = await res.json();
            
            if (res.ok) {
                console.log(data);
                
                setLivestock(data.livestock); // Set the fetched livestock
            } else {
                setError("Failed to fetch livestock details"); // Set error message
            }
        } catch (err) {
            setError("An error occurred while fetching livestock details"); // Catch network errors
        } finally {
            setLoading(false); // Stop the loading state
        }
    }

    // Handle livestock deletion
    async function handleDelete(e) {
        e.preventDefault();
        
        // Ensure livestock is loaded and current user is the owner before deleting
        if (livestock && user && user.id === livestock.owner_id) {
            try {
                const res = await fetch(`/api/livestocks/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await res.json();

                if (res.ok) {
                    navigate("/"); // Navigate to home after successful deletion
                } else {
                    setError("Failed to delete livestock."); // Handle delete error
                }
            } catch (err) {
                setError("An error occurred while deleting livestock."); // Catch network errors
            }
        }
    }

    useEffect(() => {
        getLivestocks(); // Fetch livestock details when component mounts
    }, [id]); // Re-fetch if the id changes

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator while fetching
    }

    if (error) {
        return <p className="error">{error}</p>; // Show error message if any
    }
    
    return livestock ? (
        <div key={livestock.id} className="mb-4 border rounded-md border-dashed border-slate-400">
            <h2 className="font-bold text-2xl mb-4">{livestock.type} Details</h2>
            <span> 
             
                </span>
            <table className="table-auto border-collapse border border-slate-400 w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-slate-300 px-4 py-2 text-left">Field</th>
                        <th className="border border-slate-300 px-4 py-2 text-left">Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Type</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.type}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Specie</td>
                        <td className="border border-slate-300 px-4 py-2">
                        {livestock.species?.name || 'Unknown Species'}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Breed ID</td>
                        <td className="border border-slate-300 px-4 py-2">
                        {livestock.breed?.name || 'Unknown Species'}
                            {/* {livestock.breed_id} */}
                            </td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Date of Birth</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.date_of_birth}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Gender</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.gender}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Health Status</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.health_status}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Tag ID</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.tag_id}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Herd ID</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.herd_id}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Owner ID</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.owner_id}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Location ID</td>
                        <td className="border border-slate-300 px-4 py-2">{livestock.location_id || 'N/A'}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-300 px-4 py-2">Created At</td>
                        <td className="border border-slate-300 px-4 py-2">
                            {new Date(livestock.created_at).toLocaleDateString()} at{" "}
                            {new Date(livestock.created_at).toLocaleTimeString()}
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Only show update and delete buttons if current user is the owner */}
            {user && user.id === livestock.owner_id && (
                <div className="flex items-center justify-end gap-4 mt-4">
                    <Link
                        to={`/api/livestocks/update/${livestock.id}`}
                        className="bg-green-500 text-white text-sm rounded-lg px-3 py-1"
                    >
                        Update
                    </Link>

                    <form onSubmit={handleDelete}>
                        <button
                            type="submit"
                            className="bg-red-500 text-white text-sm rounded-lg px-3 py-1"
                        >
                            Delete
                        </button>
                    </form>
                </div>
            )}
        </div>
    ) : (
        <p className="title">Livestock not found!</p>
    );
}
