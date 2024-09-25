// import { useContext, useState, useEffect } from "react"; 
// import { AppContext } from "../../Context/AppContext";
// import { useNavigate } from "react-router-dom";

// export default function CreateLivestock() {
//     const navigate = useNavigate();
//     const { token } = useContext(AppContext);
//     const [success, SetSuccess] = useState();
//     const [selectedSpecie, setSelectedSpecie] = useState('');
//     const [breeds, setBreeds] = useState([]);
//     const [loadingBreeds, setLoadingBreeds] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedBreed, setSelectedBreed] = useState('');
//     // dropdwon states for the specie
//     const [species, setSpecies] = useState([]);
//     const [selectedSpecies, setSelectedSpecies] = useState('');

//     const [formData, setFormData] = useState({
//         type: "",
//         species: "",
//         breed: "",
//         date_of_birth: "",
//         gender: "",
//         health_status: "",
//         tag_id: "",
//         herd_id: "",
//         name: "",
//         owner_id: "", // Assuming owner_id is fetched or selected in some way
//         location_id: "", // Assuming location_id is fetched or selected in some way
//     });

//     const [errors, setErrors] = useState({});

//     async function handleCreate(e) {
//         e.preventDefault();

//         const res = await fetch("/api/livestocks/store", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await res.json();

//         // Error handling and navigation after successful creation
//         if (data.errors) {
//             setErrors(data.errors);
//         } else {
//             console.log(data);
//             navigate('/', {
//                 state: { success: data.message }
//             });        }
//     }

//      // Fetch species data from the API
//     //  const fetchSpecies = async () => {
//     //     try {
//     //         const response = await fetch('/api/species');
//     //         const data = await response.json();
//     //         if (response.ok) {
//     //             setSpecies(data);
//     //         } else {
//     //             console.error('Failed to fetch species');
//     //         }
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //     }
//     // };

//     // useEffect(() => {
//     //     fetchSpecies();  // Call the fetch function when component loads
//     // }, []);

//     useEffect(() => {
//         const fetchSpecies = async () => {
//             try {
//                 const response = await fetch('/api/species');
//                 const data = await response.json();
//                 setSpecies(data);
//             } catch (error) {
//                 console.error("Error fetching species data:", error);
//             }
//         };

//         fetchSpecies();
//     }, []);


//     // Fetch breeds when a species is selected
//     const handleSpecieChange = async (event) => {
//         const specieId = event.target.value;
//         setSelectedSpecie(specieId);
//         setLoadingBreeds(true);
//         setError(null);
//         setSelectedBreed(''); // Reset breed selection

//         try {
//             const response = await fetch(`/api/breeds/${specieId}`);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             const data = await response.json();
//             setBreeds(data); 
//             setFormData({ ...formData, species: specieId }); // Set selected species in form data
//         } catch (error) {
//             setError("Error fetching breeds data.");
//         } finally {
//             setLoadingBreeds(false);
//         }
//     };

//     const handleBreedChange = (event) => {
//         const breedId = event.target.value;
//         setSelectedBreed(breedId);
//         setFormData({ ...formData, breed: breedId }); // Set selected breed in form data
      
//     };


//     return (
//         <>
//             <h1 className="title">Create a new Livestock Profile</h1>

//             <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
//                 <div>
//                     {/* <input 
//                         type="text" 
//                         placeholder="Livestock Type (e.g., Cattle, Sheep)"
//                         value={formData.type}
//                         onChange={(e) => setFormData({ ...formData, type: e.target.value })}
//                     />
//                     {errors.type && <p className="error">{errors.type[0]}</p>} */}

//             <h1>Select a Species</h1>
//                 <select value={selectedSpecie} onChange={handleSpecieChange}>
//                     <option value="">Select a species</option>
//                     {species.map((specie) => (
//                         <option key={specie.id} value={specie.id}>
//                             {specie.name}
//                         </option>
//                     ))}
//                 </select>               
//              </div>

//                 <div>
//                 <select
//                         value={selectedSpecies}
//                         onChange={(e) => setSelectedSpecies(e.target.value)}
//                         // {errors.type && <p className="error">{errors.type[0]}</p>} 

//                     >
//                          <option value="">Select...</option>
//                             {species.map((s) => (
//                             <option key={s.id} value={s.id}>
//                             {s.name} 
//                     </option>
//                 ))}
//                     </select>
//                 </div>

//                 <div>
//                 <h2>Select a Breed:</h2>
//                     <select value={selectedBreed} onChange={handleBreedChange}>
//                         <option value="">Select a breed</option>
//                         {breeds.map((breed) => (
//                             <option key={breed.id} value={breed.id}>
//                                 {breed.name}
//                             </option>
//                         ))}
//                     </select>                
//                 </div>

//                 <div>
//                     <input 
//                         type="date" 
//                         placeholder="Date of Birth"
//                         value={formData.date_of_birth}
//                         onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
//                     />
//                     {errors.date_of_birth && <p className="error">{errors.date_of_birth[0]}</p>}
//                 </div>

//                 <div>
//                     <select 
//                         value={formData.gender}
//                         onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                     {errors.gender && <p className="error">{errors.gender[0]}</p>}
//                 </div>

//                 <div>
//                     <select 
//                         value={formData.health_status}
//                         onChange={(e) => setFormData({ ...formData, health_status: e.target.value })}
//                     >
//                         <option value="">Select Health Status</option>
//                         <option value="healthy">Healthy</option>
//                         <option value="sick">Sick</option>
//                     </select>
//                     {errors.health_status && <p className="error">{errors.health_status[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Tag ID (Unique)"
//                         value={formData.tag_id}
//                         onChange={(e) => setFormData({ ...formData, tag_id: e.target.value })}
//                     />
//                     {errors.tag_id && <p className="error">{errors.tag_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Herd ID (Unique)"
//                         value={formData.herd_id}
//                         onChange={(e) => setFormData({ ...formData, herd_id: e.target.value })}
//                     />
//                     {errors.herd_id && <p className="error">{errors.herd_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Animal Name (Optional)"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     />
//                     {errors.name && <p className="error">{errors.name[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Owner ID"
//                         value={formData.owner_id}
//                         onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
//                     />
//                     {errors.owner_id && <p className="error">{errors.owner_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Location ID"
//                         value={formData.location_id}
//                         onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
//                     />
//                     {errors.location_id && <p className="error">{errors.location_id[0]}</p>}
//                 </div>

//                 <button className="primary-btn">Create Livestock Profile</button>
//             </form>
//         </>
//     );
// }





// import { useContext, useState, useEffect } from "react"; 
// import { AppContext } from "../../Context/AppContext";
// import { useNavigate } from "react-router-dom";

// export default function CreateLivestock() {
//     const navigate = useNavigate();
//     const { token } = useContext(AppContext);
//     const [success, SetSuccess] = useState();
//     const [selectedSpecie, setSelectedSpecie] = useState('');
//     const [breeds, setBreeds] = useState([]);
//     const [loadingBreeds, setLoadingBreeds] = useState(false);
//     const [error, setError] = useState(null);
//     const [selectedBreed, setSelectedBreed] = useState('');
//     const [species, setSpecies] = useState([]);
//     const [formData, setFormData] = useState({
//         type: "",
//         species: "", // This will hold the selected species ID
//         breed: "", // This will hold the selected breed ID
//         date_of_birth: "",
//         gender: "",
//         health_status: "",
//         tag_id: "",
//         herd_id: "",
//         name: "",
//         owner_id: "",
//         location_id: "",
//     });

//     const [errors, setErrors] = useState({});

//     async function handleCreate(e) {
//         e.preventDefault();

//         const res = await fetch("/api/livestocks/store", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify(formData),
//         });

//         const data = await res.json();

//         if (data.errors) {
//             setErrors(data.errors);
//         } else {
//             console.log(data);
//             navigate('/', {
//                 state: { success: data.message }
//             });        
//         }
//     }

//     useEffect(() => {
//         const fetchSpecies = async () => {
//             try {
//                 const response = await fetch('/api/species');
//                 const data = await response.json();
//                 setSpecies(data);
//             } catch (error) {
//                 console.error("Error fetching species data:", error);
//             }
//         };

//         fetchSpecies();
//     }, []);
//     useEffect(() => {
//         const fetchBreeds = async () => {
//             try {
//                 const response = await fetch('/api/breeds');
//                 const data = await response.json();
//                 setBreeds(data);
//             } catch (error) {
//                 console.error("Error fetching breeds data:", error);
//             }
//         };

//         fetchBreeds();
//     }, []);

//     const handleSpecieChange = async (event) => {
//         const specieId = event.target.value;
//         setSelectedSpecie(specieId);
//         setLoadingBreeds(true);
//         setError(null);
//         setSelectedBreed(''); // Reset breed selection

//         try {
//             const response = await fetch(`/api/breeds/${specieId}`);
//             if (!response.ok) {
//                 throw new Error(`Error fetching breeds: ${response.statusText}`);
//             }
//             const data = await response.json();
//             setBreeds(data);
//             setFormData({ ...formData, species: specieId }); // Set selected species in form data
//         } catch (error) {
//             setError(`Error fetching breeds: ${error.message}`);
//         } finally {
//             setLoadingBreeds(false);
//         }
//     };

//     const handleBreedChange = (event) => {
//         const breedId = event.target.value;
//         setSelectedBreed(breedId);
//         // setFormData({ ...formData, breed: breedId }); // Set selected breed in form data
//     };

//     return (
//         <>
//             <h1 className="title">Create a new Livestock Profile</h1>

//             <form onSubmit={handleCreate} className="w-1/2 mx-auto space-y-6">
//                 <div>
//                     <h1>Select a Species</h1>
//                     <select value={selectedSpecie} onChange={handleSpecieChange}>
//                         <option value="">Select a species</option>
//                         {species.map((specie) => (
//                             <option key={specie.id} value={specie.id}>
//                                 {specie.name}
//                             </option>
//                         ))}
//                     </select>               
//                 </div>

//                 <div>
//                     <h2>Select a Breed:</h2>
//                     <select value={selectedBreed} onChange={handleBreedChange}>
//                         <option value="">Select a breed</option>
//                         {breeds.map((breed) => (
//                             <option key={breed.id} value={breed.id}>
//                                 {breed.name}
//                             </option>
//                         ))}
//                     </select>                
//                 </div>

//                 <div>
//                     <input 
//                         type="date" 
//                         placeholder="Date of Birth"
//                         value={formData.date_of_birth}
//                         onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
//                     />
//                     {errors.date_of_birth && <p className="error">{errors.date_of_birth[0]}</p>}
//                 </div>

//                 <div>
//                     <select 
//                         value={formData.gender}
//                         onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
//                     >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                     </select>
//                     {errors.gender && <p className="error">{errors.gender[0]}</p>}
//                 </div>

//                 <div>
//                     <select 
//                         value={formData.health_status}
//                         onChange={(e) => setFormData({ ...formData, health_status: e.target.value })}
//                     >
//                         <option value="">Select Health Status</option>
//                         <option value="healthy">Healthy</option>
//                         <option value="sick">Sick</option>
//                     </select>
//                     {errors.health_status && <p className="error">{errors.health_status[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Tag ID (Unique)"
//                         value={formData.tag_id}
//                         onChange={(e) => setFormData({ ...formData, tag_id: e.target.value })}
//                     />
//                     {errors.tag_id && <p className="error">{errors.tag_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Herd ID (Unique)"
//                         value={formData.herd_id}
//                         onChange={(e) => setFormData({ ...formData, herd_id: e.target.value })}
//                     />
//                     {errors.herd_id && <p className="error">{errors.herd_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Animal Name (Optional)"
//                         value={formData.name}
//                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     />
//                     {errors.name && <p className="error">{errors.name[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Owner ID"
//                         value={formData.owner_id}
//                         onChange={(e) => setFormData({ ...formData, owner_id: e.target.value })}
//                     />
//                     {errors.owner_id && <p className="error">{errors.owner_id[0]}</p>}
//                 </div>

//                 <div>
//                     <input 
//                         type="text" 
//                         placeholder="Location ID"
//                         value={formData.location_id}
//                         onChange={(e) => setFormData({ ...formData, location_id: e.target.value })}
//                     />
//                     {errors.location_id && <p className="error">{errors.location_id[0]}</p>}
//                 </div>

//                 <button className="primary-btn">Create Livestock Profile</button>
//             </form>
//         </>
//     );
// }



import { useState, useEffect } from 'react';

export default function LivestockForm() {
    const [species, setSpecies] = useState([]);  // All species
    const [breeds, setBreeds] = useState([]);    // Breeds corresponding to selected species
    const [selectedSpecies, setSelectedSpecies] = useState(''); // Selected species
    const [selectedBreed, setSelectedBreed] = useState('');     // Selected breed

    // Fetch all species when component mounts
    useEffect(() => {
        async function fetchSpecies() {
            const response = await fetch('/api/species');
            const data = await response.json();
            setSpecies(data);  // Set species data
        }
        fetchSpecies();
    }, []);

    // Fetch breeds when a species is selected
    useEffect(() => {
        if (selectedSpecies) {
            async function fetchBreeds() {
                try {
                    const response = await fetch(`/api/species/${selectedSpecies}/breeds`);
                    const data = await response.json();
                    
                    // Log the data to verify the response
                    console.log("Breeds data:", data);
    
                    setBreeds(data);
                    if (data.length > 0) {
                        setSelectedBreed(data[0].id);  // Automatically select first breed
                    } else {
                        setSelectedBreed('');
                    }
                } catch (error) {
                    console.error("Error fetching breeds:", error);
                }
            }
            fetchBreeds();
        } else {
            setBreeds([]);
        }
    }, [selectedSpecies]);

    
    return (
        <div className="livestock-form">
            <h2>Select Livestock</h2>
            <form>
                {/* Species Selection Dropdown */}
                <div className="form-group">
                    <label htmlFor="species">Species</label>
                    <select
                        id="species"
                        value={selectedSpecies}
                        onChange={(e) => setSelectedSpecies(e.target.value)}
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
                <div className="form-group">
                    <label htmlFor="breed">Breed</label>
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

                {/* Submit Button */}
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </div>
    );
}
