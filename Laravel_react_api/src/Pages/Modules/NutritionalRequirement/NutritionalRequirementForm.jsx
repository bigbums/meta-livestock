import { useState, useEffect } from 'react';

export default function NutritionalRequirementsForm() {
    const [species, setSpecies] = useState([]);
    const [breeds, setBreeds] = useState([]);
    const [formData, setFormData] = useState({
        species_id: '',
        breed_id: '',
        age_range: '',
        weight_range: '',
        //health_status: '',
        production_type: '',
        requirement_type: '',
        requirement_value: ''
    });

    // Fetch species and populate dropdown
    useEffect(() => {
        async function fetchSpecies() {
            const res = await fetch('/api/species');
            const data = await res.json();
            setSpecies(data);
        }
        fetchSpecies();
    }, []);

    // Fetch breeds when species is selected
    const handleSpeciesChange = async (e) => {
        const speciesId = e.target.value;
        setFormData({ ...formData, species_id: speciesId });

        if (speciesId) {
            const res = await fetch(`/api/species/${speciesId}/breeds`);
            const data = await res.json();
            setBreeds(data);
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/nutritional-requirements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log('Created Nutritional Requirement:', data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Species</label>
            <select onChange={handleSpeciesChange} value={formData.species_id}>
                <option value="">Select Species</option>
                {species.map((sp) => (
                    <option key={sp.id} value={sp.id}>{sp.name}</option>
                ))}
            </select>

            <label>Breed</label>
            <select onChange={(e) => setFormData({ ...formData, breed_id: e.target.value })} value={formData.breed_id}>
                <option value="">Select Breed</option>
                {breeds.map((br) => (
                    <option key={br.id} value={br.id}>{br.name}</option>
                ))}
            </select>

            {/* Other form fields for age range, weight, etc. */}
            <input type="text" placeholder="Age Range" onChange={(e) => setFormData({ ...formData, age_range: e.target.value })} />
            <input type="text" placeholder="Weight Range" onChange={(e) => setFormData({ ...formData, weight_range: e.target.value })} />
            {/* <input type="text" placeholder="Health Status" onChange={(e) => setFormData({ ...formData, health_status: e.target.value })} /> */}
            <input type="text" placeholder="Production Type" onChange={(e) => setFormData({ ...formData, production_type: e.target.value })} />
            <input type="text" placeholder="Requirement Type" onChange={(e) => setFormData({ ...formData, requirement_type: e.target.value })} />
            <input type="number" placeholder="Requirement Value" onChange={(e) => setFormData({ ...formData, requirement_value: e.target.value })} />

            <button type="submit">Add Nutritional Requirement</button>
        </form>
    );
}
