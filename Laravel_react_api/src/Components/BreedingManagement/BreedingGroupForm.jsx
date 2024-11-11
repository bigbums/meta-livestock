



// import { useState } from 'react';

// const BreedingGroupForm = ({ livestockOptions, onSubmit }) => {
//     const [groupType, setGroupType] = useState('multiple');
//     const [selectedLivestock, setSelectedLivestock] = useState([]);
//     const [breedingGroupName, setBreedingGroupName] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [maleCount, setMaleCount] = useState(0);
//     const [femaleCount, setFemaleCount] = useState(0);
//     const [location, setLocation] = useState('');
//     const [notes, setNotes] = useState('');

//     const handleAddLivestock = (livestockId, role) => {
//         setSelectedLivestock([...selectedLivestock, { livestockId, role }]);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onSubmit({
//             breeding_group_name: breedingGroupName,
//             group_type: groupType,
//             start_date: startDate,
//             end_date: endDate,
//             male_count: maleCount,
//             female_count: femaleCount,
//             location,
//             notes,
//             selectedLivestock
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Create Breeding Group</h2>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Breeding Group Name</label>
//                 <input
//                     type="text"
//                     value={breedingGroupName}
//                     onChange={(e) => setBreedingGroupName(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Group Type</label>
//                 <select value={groupType} onChange={(e) => setGroupType(e.target.value)} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                     <option value="pair">Pair</option>
//                     <option value="multiple">Multiple</option>
//                 </select>
//             </div>

//             {groupType === 'pair' ? (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Male Livestock</label>
//                         <select onChange={(e) => handleAddLivestock(e.target.value, 'male')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                             {livestockOptions.map(l => (
//                                 <option key={l.id} value={l.id}>{l.name} (Male)</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Female Livestock</label>
//                         <select onChange={(e) => handleAddLivestock(e.target.value, 'female')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                             {livestockOptions.map(l => (
//                                 <option key={l.id} value={l.id}>{l.name} (Female)</option>
//                             ))}
//                         </select>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Add Livestock to Group</label>
//                         {livestockOptions.map(l => (
//                             <div key={l.id} className="flex justify-between items-center mb-2">
//                                 <span>{l.name}</span>
//                                 <div>
//                                     <button type="button" onClick={() => handleAddLivestock(l.id, 'male')} className="text-blue-500 hover:underline mx-2">Add as Male</button>
//                                     <button type="button" onClick={() => handleAddLivestock(l.id, 'female')} className="text-green-500 hover:underline mx-2">Add as Female</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Additional Fields */}
            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">Start Date</label>
            //     <input
            //         type="date"
            //         value={startDate}
            //         onChange={(e) => setStartDate(e.target.value)}
            //         required
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">End Date</label>
            //     <input
            //         type="date"
            //         value={endDate}
            //         onChange={(e) => setEndDate(e.target.value)}
            //         required
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">Male Count</label>
            //     <input
            //         type="number"
            //         value={maleCount}
            //         onChange={(e) => setMaleCount(e.target.value)}
            //         required
            //         min={0}
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">Female Count</label>
            //     <input
            //         type="number"
            //         value={femaleCount}
            //         onChange={(e) => setFemaleCount(e.target.value)}
            //         required
            //         min={0}
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">Location</label>
            //     <input
            //         type="text"
            //         value={location}
            //         onChange={(e) => setLocation(e.target.value)}
            //         required
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

            // <div className="mb-4">
            //     <label className="block text-gray-700 font-medium mb-2">Notes</label>
            //     <textarea
            //         value={notes}
            //         onChange={(e) => setNotes(e.target.value)}
            //         rows={3}
            //         className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            //     />
            // </div>

//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//                 Save Breeding Group
//             </button>
//         </form>
//     );
// };

// export default BreedingGroupForm;



// import { useState, useEffect } from 'react';

// const BreedingGroupForm = ({ onSubmit }) => {
//     const [groupType, setGroupType] = useState('multiple');
//     const [selectedLivestock, setSelectedLivestock] = useState([]);
//     const [breedingGroupName, setBreedingGroupName] = useState('');
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [maleCount, setMaleCount] = useState(0);
//     const [femaleCount, setFemaleCount] = useState(0);
//     const [location, setLocation] = useState('');
//     const [notes, setNotes] = useState('');
    
//     // State for species and livestock
//     const [speciesOptions, setSpeciesOptions] = useState([]);
//     const [selectedSpeciesId, setSelectedSpeciesId] = useState('');
//     const [filteredLivestockOptions, setFilteredLivestockOptions] = useState([]);

//     // Fetch species options on component mount
//     useEffect(() => {
//         const fetchSpeciesOptions = async () => {
//             try {
//                 const response = await fetch('/api/species'); // Adjust this endpoint as necessary
//                 if (!response.ok) throw new Error('Failed to fetch species');
//                 const data = await response.json();
//                 setSpeciesOptions(data);
//             } catch (error) {
//                 console.error('Error fetching species:', error);
//             }
//         };

//         fetchSpeciesOptions();
//     }, []);

//     // Fetch livestock based on selected species
//     useEffect(() => {
//         if (selectedSpeciesId) {
//             const fetchLivestockBySpecies = async () => {
//                 try {
//                     const response = await fetch(`/api/species/${selectedSpeciesId}/livestock`);
//                     if (!response.ok) throw new Error('Failed to fetch livestock');
//                     const data = await response.json();
//                     setFilteredLivestockOptions(data);
//                 } catch (error) {
//                     console.error('Error fetching livestock:', error);
//                 }
//             };

//             fetchLivestockBySpecies();
//         } else {
//             setFilteredLivestockOptions([]); // Reset if no species is selected
//         }
//     }, [selectedSpeciesId]);

//     const handleAddLivestock = (livestockId, role) => {
//         setSelectedLivestock([...selectedLivestock, { livestockId, role }]);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onSubmit({
//             breeding_group_name: breedingGroupName,
//             group_type: groupType,
//             start_date: startDate,
//             end_date: endDate,
//             male_count: maleCount,
//             female_count: femaleCount,
//             location,
//             notes,
//             selectedLivestock
//         });
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Create Breeding Group</h2>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Breeding Group Name</label>
//                 <input
//                     type="text"
//                     value={breedingGroupName}
//                     onChange={(e) => setBreedingGroupName(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Select Species</label>
//                 <select 
//                     value={selectedSpeciesId} 
//                     onChange={(e) => setSelectedSpeciesId(e.target.value)} 
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 >
//                     <option value="">Select Species</option>
//                     {speciesOptions.map(species => (
//                         <option key={species.id} value={species.id}>{species.name}</option>
//                     ))}
//                 </select>
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Group Type</label>
//                 <select value={groupType} onChange={(e) => setGroupType(e.target.value)} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                     <option value="pair">Pair</option>
//                     <option value="multiple">Multiple</option>
//                 </select>
//             </div>

//             {groupType === 'pair' ? (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Male Livestock</label>
//                         <select onChange={(e) => handleAddLivestock(e.target.value, 'male')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                             {filteredLivestockOptions.filter(l => l.gender === 'male').map(livestock => (
//                                 <option key={livestock.id} value={livestock.id}>{livestock.name} (Male)</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Female Livestock</label>
//                         <select onChange={(e) => handleAddLivestock(e.target.value, 'female')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
//                             {filteredLivestockOptions.filter(l => l.gender === 'female').map(livestock => (
//                                 <option key={livestock.id} value={livestock.id}>{livestock.name} (Female)</option>
//                             ))}
//                         </select>
//                     </div>
//                 </>
//             ) : (
//                 <>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 font-medium mb-2">Add Livestock to Group</label>
//                         {filteredLivestockOptions.map(livestock => (
//                             <div key={livestock.id} className="flex justify-between items-center mb-2">
//                                 <span>{livestock.name}</span>
//                                 <div>
//                                     <button type="button" onClick={() => handleAddLivestock(livestock.id, 'male')} className="text-blue-500 hover:underline mx-2">Add as Male</button>
//                                     <button type="button" onClick={() => handleAddLivestock(livestock.id, 'female')} className="text-green-500 hover:underline mx-2">Add as Female</button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Additional Fields */}
//             {/* Start Date */}
//             {/* End Date */}
//             {/* Male Count */}
//             {/* Female Count */}
//             {/* Location */}
//             {/* Notes */}

//             {/* Submit Button */}
//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//                 Save Breeding Group
//             </button>
//         </form>
//     );
// };

// export default BreedingGroupForm;



import { useState, useEffect } from 'react';

const BreedingGroupForm = ({ onSubmit, }) => {
    const [groupType, setGroupType] = useState('multiple');
    const [selectedLivestock, setSelectedLivestock] = useState([]);
    const [breedingGroupName, setBreedingGroupName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    
    // State for species and livestock
    const [speciesOptions, setSpeciesOptions] = useState([]);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState('');
    const [filteredLivestockOptions, setFilteredLivestockOptions] = useState([]);

    // Fetch species options on component mount
    useEffect(() => {
        const fetchSpeciesOptions = async () => {
            try {
                const response = await fetch('/api/species'); // Adjust this endpoint as necessary
                if (!response.ok) throw new Error('Failed to fetch species');
                const data = await response.json();
                setSpeciesOptions(data);
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        };

        fetchSpeciesOptions();
    }, []);

    // Fetch livestock based on selected species
    useEffect(() => {
        if (selectedSpeciesId) {
            const fetchLivestockBySpecies = async () => {
                try {
                    const response = await fetch(`/api/species/${selectedSpeciesId}/livestock`);
                    if (!response.ok) throw new Error('Failed to fetch livestock');
                    const data = await response.json();
                    setFilteredLivestockOptions(data);
                } catch (error) {
                    console.error('Error fetching livestock:', error);
                }
            };

            fetchLivestockBySpecies();
        } else {
            setFilteredLivestockOptions([]); // Reset if no species is selected
        }
    }, [selectedSpeciesId]);

    const handleAddLivestock = (livestockId, role) => {
        setSelectedLivestock([...selectedLivestock, { livestockId, role }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            breeding_group_name: breedingGroupName,
            group_type: groupType,
            start_date: startDate,
            end_date: endDate,
            male_count: maleCount,
            female_count: femaleCount,
            location:location,
            notes:notes,
            selectedLivestock
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create Breeding Group</h2>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Breeding Group Name</label>
                <input
                    type="text"
                    value={breedingGroupName}
                    onChange={(e) => setBreedingGroupName(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

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
                <label className="block text-gray-700 font-medium mb-2">Group Type</label>
                <select value={groupType} onChange={(e) => setGroupType(e.target.value)} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
                    <option value="pair">Pair</option>
                    <option value="multiple">Multiple</option>
                </select>
            </div>

            {groupType === 'pair' ? (
                <>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Male Livestock</label>
                        <select onChange={(e) => handleAddLivestock(e.target.value, 'Male')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
                            {filteredLivestockOptions.filter(livestock => livestock.gender === 'Male').map(livestock => (
                                <option key={livestock.id} value={livestock.id}>{livestock.name} (Male)</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Female Livestock</label>
                        <select onChange={(e) => handleAddLivestock(e.target.value, 'Female')} className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300">
                            {filteredLivestockOptions.filter(livestock => livestock.gender === 'Female').map(livestock => (
                                <option key={livestock.id} value={livestock.id}>{livestock.name} (Female)</option>
                            ))}
                        </select>
                    </div>
                </>
            ) : (
                <> <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Male Livestock</label>
                {filteredLivestockOptions.filter(l => l.gender === 'Male').map(livestock => (
                    <div key={livestock.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`male-${livestock.id}`}
                            value={livestock.id}
                            onChange={() => handleAddLivestock(livestock.id, 'male')}
                        />
                        <label htmlFor={`male-${livestock.id}`} className="ml-2">{livestock.name}</label>
                    </div>
                ))}
            </div>
    
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Select Female Livestock</label>
                {filteredLivestockOptions.filter(l => l.gender === 'Female').map(livestock => (
                    <div key={livestock.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            id={`female-${livestock.id}`}
                            value={livestock.id}
                            onChange={() => handleAddLivestock(livestock.id, 'female')}
                        />
                        <label htmlFor={`female-${livestock.id}`} className="ml-2">{livestock.name}</label>
                    </div>
                ))}
            </div>
                </>
            )}

<div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Start Date</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">End Date</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Male Count</label>
                <input
                    type="number"
                    value={maleCount}
                    onChange={(e) => setMaleCount(e.target.value)}
                    required
                    min={0}
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Female Count</label>
                <input
                    type="number"
                    value={femaleCount}
                    onChange={(e) => setFemaleCount(e.target.value)}
                    required
                    min={0}
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Notes</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                Save Breeding Group
            </button>
        </form>
    );
};

export default BreedingGroupForm;