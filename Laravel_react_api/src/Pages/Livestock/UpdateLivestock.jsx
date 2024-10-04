import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function UpdateLivestock() {
    const { id } = useParams(); // Get livestock id from URL params
    const navigate = useNavigate();
    const { user, token } = useContext(AppContext); // Get user and token from context

    const [livestock, setLivestock] = useState(null); // Livestock state
    const [species, setSpecies] = useState([]); // Species state
    const [breeds, setBreeds] = useState([]); // Breeds state
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [successMessage, setSuccessMessage] = useState(null); // Success message state

    // Fetch livestock details
    async function getLivestock() {
        try {
            const res = await fetch(`/api/livestocks/detail/${id}`);
            const data = await res.json();

            if (res.ok) {
                setLivestock(data.livestock);
                setLoading(false);
            } else {
                setError("Failed to fetch livestock details");
                setLoading(false);
            }
        } catch (err) {
            setError("An error occurred while fetching livestock details");
            setLoading(false);
        }
    }

    // Fetch species for dropdown
    async function getSpecies() {
        try {
            const speciesRes = await fetch("/api/species"); // Fetch species data
            if (speciesRes.ok) {
                const speciesData = await speciesRes.json();
                setSpecies(speciesData); // Set species data
            } else {
                setError("Failed to fetch species data.");
            }
        } catch (err) {
            setError("An error occurred while fetching species data.");
        }
    }

    // Fetch breeds for the selected species
    async function getBreeds(species_id) {
        try {
            const breedsRes = await fetch(`/api/species/${species_id}/breeds`); // Fetch breeds based on species
            if (breedsRes.ok) {
                const breedsData = await breedsRes.json();
                setBreeds(breedsData); // Set breeds data
            } else {
                setError("Failed to fetch breeds data.");
            }
        } catch (err) {
            setError("An error occurred while fetching breeds data.");
        }
    }

    // Handle livestock update
    async function handleUpdate(e) {
        e.preventDefault();

        try {
            const res = await fetch(`/api/livestocks/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(livestock),
            });

            if (res.ok) {
                const updatedLivestock = await res.json();
                setSuccessMessage(updatedLivestock.message);
                navigate(`/api/livestocks/update/${id}`); // Navigate to livestock details after update
            } else {
                setError("Failed to update details.");
            }
        } catch (err) {
            setError("An error occurred while updating livestock.");
        }
    }

    useEffect(() => {
        getLivestock(); // Fetch livestock details
        getSpecies(); // Fetch species options
    }, [id]);

    useEffect(() => {
        if (livestock && livestock.species_id) {
            getBreeds(livestock.species_id); // Fetch breeds when livestock or species changes
        }
    }, [livestock?.species_id]);

    if (loading) {
        return <p>Loading...</p>; // Show loading indicator
    }

    if (error) {
        return <p className="error">{error}</p>; // Show error message if any
    }

    return (
        <div className="font-bold text-2xl mb-4">
            <h2 className="font-bold text-2xl mb-4">Update Livestock</h2>
            {successMessage && <p className="success">{successMessage}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block">Type:</label>
                    <input
                        type="text"
                        value={livestock.type}
                        onChange={(e) => setLivestock({ ...livestock, type: e.target.value })}
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Species:</label>
                    <select
                        value={livestock.species_id}
                        onChange={(e) => {
                            const speciesId = e.target.value;
                            setLivestock({ ...livestock, species_id: speciesId });
                            getBreeds(speciesId); // Fetch breeds when species changes
                        }}
                        className="border rounded w-full px-2 py-1"
                    >
                        <option value="">Select Species</option>
                        {species.map((specie) => (
                            <option key={specie.id} value={specie.id}>
                                {specie.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Breed:</label>
                    <select
                        value={livestock.breed_id}
                        onChange={(e) => setLivestock({ ...livestock, breed_id: e.target.value })}
                        className="border rounded w-full px-2 py-1"
                    >
                        <option value="">Select Breed</option>
                        {breeds.map((breed) => (
                            <option key={breed.id} value={breed.id}>
                                {breed.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Date of Birth:</label>
                    <input
                        type="date"
                        value={livestock.date_of_birth}
                        onChange={(e) => setLivestock({ ...livestock, date_of_birth: e.target.value })}
                        className="border rounded w-full px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block">Gender:</label>
                    <select
                        value={livestock.gender}
                        onChange={(e) => setLivestock({ ...livestock, gender: e.target.value })}
                        className="border rounded w-full px-2 py-1"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div>
                    <label className="block">Health Status:</label>
                    <select 
                        value={livestock.health_status}
                        onChange={(e) => setLivestock({ ...livestock, health_status: e.target.value })}
                        className="border rounded w-full px-2 py-1"
                    >
                            <option value="">Select Health Status</option>
                            <option value="healthy">Healthy</option>
                            <option value="sick">Sick</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Update Livestock
                </button>
            </form>
        </div>
    );
}
