
import { useState, useEffect, useContext } from 'react';
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";


export default function NutritionalRequirementSpeciesForm() {
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
                age_range: '',
                weight_range: '',
                //health_status: '',
                production_type: '',
                requirement_type: '',
                requirement_value: '',
     });


 
    const handleCreate = async (e) => {
        e.preventDefault();
    
        const updatedFormData = {
            ...formData,
            species: selectedSpecies, // Add the selected species ID
            breed: selectedBreed,     // Add the selected breed ID
        };
    
        const res = await fetch("/api/nutritional-requirements", {
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
            navigate('/modules/nutritional-requirement/list', {
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
        <div className="nutritional-requirement-species-form">
            <h1 className="title">Create a new nutritional-requirement Profile</h1>

            <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">


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
                    <div>
                    <input 
                        id="age_range"
                        type="text" 
                        placeholder="age_range"
                        value={formData.age_range}
                        onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                    />
                    {/* {errors.name && <p className="error">{errors.name[0]}</p>} */}
                </div>


                    <div className='flex gap-6 justify-start'>
                      
                        <input 

                            type="text" 
                            placeholder="weight_range"
                            value={formData.weight_range}
                            onChange={(e) => setFormData({ ...formData, weight_range: e.target.value })}
                        />
                        {/* {errors.date_of_birth && <p className="error">{errors.date_of_birth[0]}</p>} */}
                    </div>

                

                <div>
                    <input 
                        type="text" 
                        placeholder="production_type"
                        value={formData.production_type}
                        onChange={(e) => setFormData({ ...formData, production_type: e.target.value })}
                    />
                    {/* {errors.tag_id && <p className="error">{errors.tag_id[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="requirement type"
                        value={formData.requirement_type}
                        onChange={(e) => setFormData({ ...formData, requirement_type: e.target.value })}
                    />
                    {/* {errors.herd_id && <p className="error">{errors.herd_id[0]}</p>} */}
                </div>

                <div>
                    <input 
                        type="text" 
                        placeholder="requirement value"
                        value={formData.requirement_value}
                        onChange={(e) => setFormData({ ...formData, requirement_value: e.target.value })}
                    />
                    {/* {errors.name && <p className="error">{errors.name[0]}</p>} */}
                </div>

              
                </div>
               

                <button className="primary-btn">Submit</button>

            </form>
        </div>
    );
}
