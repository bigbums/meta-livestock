import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EstrusCycleForm({ initialData = {}, onSubmit }) {
    const [startDate, setStartDate] = useState(initialData.start_date || '');
    const [endDate, setEndDate] = useState(initialData.end_date || '');
    const [activityLevel, setActivityLevel] = useState(initialData.activity_level || '');
    const [notes, setNotes] = useState(initialData.behavior_notes || '');
    const [temperatureChange, setTemperatureChange] = useState(initialData.temperature_change || '');
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState(initialData.species_id || '');
    const [femaleLivestockOptions, setFemaleLivestockOptions] = useState([]);
    const [selectedLivestockId, setSelectedLivestockId] = useState(initialData.livestock_id || '');
    const navigate = useNavigate();

    // Fetch species options on component mount
    useEffect(() => {
        const fetchSpeciesOptions = async () => {
            try {
                const response = await axios.get('/api/species');
                setSpeciesOptions(response.data);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        };

        fetchSpeciesOptions();
    }, []);

    // Fetch female livestock based on selected species
    useEffect(() => {
        if (selectedSpeciesId) {
            const fetchFemaleLivestockBySpecies = async () => {
                try {
                    const response = await axios.get(`/api/species/${selectedSpeciesId}/livestock`);
                    const femaleLivestock = response.data.filter(livestock => livestock.gender === 'Female');
                    setFemaleLivestockOptions(femaleLivestock);
                } catch (error) {
                    console.error('Error fetching female livestock:', error);
                }
            };

            fetchFemaleLivestockBySpecies();
        } else {
            setFemaleLivestockOptions([]);
        }
    }, [selectedSpeciesId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            livestock_id: selectedLivestockId,
            start_date: startDate,
            end_date: endDate,
            activity_level: activityLevel,
            behavior_notes: notes,
            temperature_change: temperatureChange,
        };
        onSubmit(updatedData); // Pass the updated data to the onSubmit handler
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{initialData.id ? 'Edit Estrus Cycle' : 'Add Estrus Cycle'}</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Species</label>
                <select 
                    value={selectedSpeciesId} 
                    onChange={(e) => setSelectedSpeciesId(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select Species</option>
                    {speciesOptions.map(species => (
                        <option key={species.id} value={species.id}>{species.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Female Livestock</label>
                <select 
                    value={selectedLivestockId} 
                    onChange={(e) => setSelectedLivestockId(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select Female Livestock</option>
                    {femaleLivestockOptions.map(livestock => (
                        <option key={livestock.id} value={livestock.id}>{livestock.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Start Date:</label>
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={e => setStartDate(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">End Date:</label>
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={e => setEndDate(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Activity Level:</label>
                <input 
                    type="text" 
                    value={activityLevel} 
                    onChange={e => setActivityLevel(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Temperature Change:</label>
                <input 
                    type="number" 
                    value={temperatureChange} 
                    onChange={e => setTemperatureChange(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {initialData.id ? 'Update Estrus Cycle' : 'Add Estrus Cycle'}
            </button>
        </form>
    );
}

export default EstrusCycleForm;
