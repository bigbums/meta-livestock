import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PregnancyForm({ initialData = {}, onSubmit }) {
    const [breedingDate, setBreedingDate] = useState(initialData.breeding_date || '');
    const [detectionDate, setDetectionDate] = useState(initialData.detection_date || '');
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(initialData.expected_delivery_date || '');
    const [pregnancyStatus, setPregnancyStatus] = useState(initialData.pregnancy_status || '');
    const [notes, setNotes] = useState(initialData.notes || '');
    const [detectionMethod, setDetectionMethod] = useState(initialData.detection_method || '');
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState(initialData.species_id || '');
    const [femaleLivestockOptions, setFemaleLivestockOptions] = useState([]);
    const [selectedLivestockId, setSelectedLivestockId] = useState(initialData.livestock_id || '');
    const navigate = useNavigate();

    // Fetch species options on component mount
    useEffect(() => {
        const fetchSpeciesOptions = async () => {
            try {
                const response = await axios.get('/api/pregnancy-records');
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
                    const response = await axios.get(`/api/pregnancy-records/${selectedSpeciesId}/livestock`);
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
            breeding_date: breedingDate,
            pregnancy_status: pregnancyStatus,
            detection_method: detectionMethod,
            detection_date: detectionDate,
            expected_delivery_date: expectedDeliveryDate,            
            notes: notes,
            
        };
        onSubmit(updatedData); // Pass the updated data to the onSubmit handler
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{initialData.id ? 'Edit Pregnancy Record' : 'Add Pregnancy Record'}</h2>

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
                <label className="block text-gray-700 font-medium mb-2">Breeding Date:</label>
                <input 
                    type="date" 
                    value={breedingDate} 
                    onChange={e => setBreedingDate(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Detection Date:</label>
                <input 
                    type="date" 
                    value={detectionDate} 
                    onChange={e => setDetectionDate(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Expected Delivery Date:</label>
                <input 
                    type="date" 
                    value={expectedDeliveryDate} 
                    onChange={e => setExpectedDeliveryDate(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Prenancy Status:</label>
                <input 
                    type="text" 
                    value={pregnancyStatus} 
                    onChange={e => setPregnancyStatus(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Detection Method:</label>
                <input 
                    type="text" 
                    value={detectionMethod} 
                    onChange={e => setDetectionMethod(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Notes:</label>
                <input 
                    type="text" 
                    value={notes} 
                    onChange={e => setNotes(e.target.value)} 
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                {initialData.id ? 'Update Pregnancy Record' : 'Add Pregnancy Record'}
            </button>
        </form>
    );
}

export default PregnancyForm;
