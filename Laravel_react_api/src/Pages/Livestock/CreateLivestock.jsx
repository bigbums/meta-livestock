import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";


export default function LivestockForm() {
    const [species, setSpecies] = useState([]);  // All species
    const [breeds, setBreeds] = useState([]);    // Breeds corresponding to selected species
    const [selectedSpecies, setSelectedSpecies] = useState(''); // Selected species
    const [selectedBreed, setSelectedBreed] = useState('');     // Selected breed
    const navigate = useNavigate();
    const { token } = useContext(AppContext);
    const [success, SetSuccess] = useState();
    const [errors, setErrors] = useState(null);
    const [formData, setFormData] = useState({
                type: selectedSpecies,
                species: selectedSpecies, // This will hold the selected species ID
                breed: selectedBreed, // This will hold the selected breed ID
                date_of_birth: "",
                gender: "",
                health_status: "",
                tag_id: "",
                herd_id: "",
                name: "",
                owner_id: "",
                location_id: "",
     });


    //  async function handleCreate(e) {
    //     e.preventDefault();

    //     const res = await fetch("/api/livestocks/store", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(formData),
    //     });
    //     console.log(formData);

    //     const data = await res.json();

    //     if (data.errors) {
    //         setErrors(data.errors);
    //     } else {
    //         console.log(data);
    //         navigate('/', {
    //             state: { success: data.message }
    //         });        
    //     }
    // }


    const handleCreate = async (e) => {
        e.preventDefault();
    
        const updatedFormData = {
            ...formData,
            species: selectedSpecies, // Add the selected species ID
            breed: selectedBreed,     // Add the selected breed ID
        };
    
        const res = await fetch("/api/livestocks/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFormData),
        });
    
        const data = await res.json();
    
        if (data.errors) {
            setErrors(data.errors);
        } else {
            console.log(data);
            navigate('/', {
                state: { success: data.message }
            });
        }
    };
    


    // Fetch all species when component mounts
    useEffect(() => {
        async function fetchSpecies() {
            const response = await fetch('/api/species/');
            const data = await response.json();
            setSpecies(data);  // Set species data
        }
        fetchSpecies();
    }, []);

    // Fetch breeds when a species is selected
    useEffect(() => {
        if (selectedSpecies) {
            console.log("Selected species:", selectedSpecies); // Add this log
            async function fetchBreeds() {
                try {
                    const response = await fetch(`/api/species/${selectedSpecies}/breeds`);
                    const data = await response.json();
                    
                    // Log the data to verify the response
                    console.log("Breeds data:", data);
    
                     // Set breeds and make sure the first breed is auto-selected
                    setBreeds(data);
                    if (data.length > 0) {
                        setSelectedBreed(data[0].id);  // Automatically select first breed
                    } else {
                        setSelectedBreed(''); // Reset breed if no data is returned
                    }
                } catch (error) {
                    console.error("Error fetching breeds:", error);
                }
            }
            fetchBreeds();
        } else {
            setBreeds([]);
        }

       
    }, [selectedSpecies] , [selectedBreed]);  console.log ("Selected Breed:" , selectedBreed);

    
    return (
        <div className="livestock-form">
            <h1 className="title">Create a new Livestock Profile</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">

            <div>
                    <input 
                        id="type"
                        type="text" 
                        placeholder="Animal Type"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    />
                    {/* {errors.name && <p className="error">{errors.name[0]}</p>} */}
                </div>

                <div className='grid grid-rows-1 gap-4'>
                    {/* Species Selection Dropdown */}
                    <div className="form-group flex gap-6 justify-start">
                        <label htmlFor="species">Species:</label>
                        <select
                            id="species"
                            value={selectedSpecies}
                            onChange={(e) => setSelectedSpecies(e.target.value)}
                            className='flex '
                        >
                            <option value="">Select a Species</option>
                            {species.map((sp) => (
                                <option key={sp.id} value={sp.id}>
                                    {sp.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Breeds Selection Dropdown */}
                    <div className="form-group flex gap-6 justify-start">
                        <label htmlFor="breed">Breed:</label>
                        <select
                            id="breed"
                            value={selectedBreed}
                            onChange={(e) => setSelectedBreed(e.target.value)}
                            disabled={!selectedSpecies || breeds.length === 0}
                        >
                            <option value="">Select a Breed</option>
                            {breeds.map((breed) => (
                                <option key={breed.id} value={breed.id}>
                                    {breed.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className='flex gap-6 justify-start'>
                        <h1>Date of Birth:</h1>
                        <input 

                            type="date" 
                            placeholder="Date of Birth"
                            value={formData.date_of_birth}
                            onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                        />
                        {/* {errors.date_of_birth && <p className="error">{errors.date_of_birth[0]}</p>} */}
                    </div>

                    <div className='flex gap-6 justify-start'>
                        <h1>Gender:</h1>
                        <select 
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        {/* {errors.gender && <p className="error">{errors.gender[0]}</p>} */}
                    </div>

                    <div className='flex gap-6 justify-start'>
                        <h1>Health status</h1>
                        <select 
                            value={formData.health_status}
                            onChange={(e) => setFormData({ ...formData, health_status: e.target.value })}
                        >
                            <option value="">Select Health Status</option>
                            <option value="healthy">Healthy</option>
                            <option value="sick">Sick</option>
                        </select>
                        {/* {errors.health_status && <p className="error">{errors.health_status[0]}</p>} */}
                    </div>
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Tag ID (Unique)"
                        value={formData.tag_id}
                        onChange={(e) => setFormData({ ...formData, tag_id: e.target.value })}
                    />
                    {/* {errors.tag_id && <p className="error">{errors.tag_id[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Herd ID (Unique)"
                        value={formData.herd_id}
                        onChange={(e) => setFormData({ ...formData, herd_id: e.target.value })}
                    />
                    {/* {errors.herd_id && <p className="error">{errors.herd_id[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Animal Name (Optional)"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {/* {errors.name && <p className="error">{errors.name[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Owner ID"
                        value={formData.owner_id}
                        onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
                    />
                    {/* {errors.owner_id && <p className="error">{errors.owner_id[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="Location ID"
                        value={formData.location_id}
                        onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
                    />
                    {/* {errors.location_id && <p className="error">{errors.location_id[0]}</p>} */}
                </div>

                <button className="primary-btn">Submit</button>

            </form>
        </div>
    );
}
