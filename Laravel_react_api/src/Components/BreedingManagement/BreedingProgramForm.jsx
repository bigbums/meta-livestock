// import { useState, useEffect } from 'react';

// const BreedingProgramForm = ({ onSubmit, initialData = {} }) => {
//     const [programName, setProgramName] = useState(initialData.program_name || '');
//     const [targetOffspringCount, setTargetOffspringCount] = useState(initialData.target_offspring_count || null);
//     const [livestockGroupId, setLivestockGroupId] = useState(initialData.livestock_group_id || null);
//     const [livestockGroups, setLivestockGroups] = useState([]); /
//     const [objective, setObjective] = useState(initialData.objective || '');
//     const [startDate, setStartDate] = useState(initialData.start_date || '');
//     const [endDate, setEndDate] = useState(initialData.end_date || '');
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     useEffect(() => {
//         const fetchLivestockGroups = async () => {
//             try {
//                 const response = await fetch('http://localhost:5173/api/livestock-groups');
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch livestock groups");
//                 }
//                 const data = await response.json();
//                 setLivestockGroups(data);
//             } catch (error) {
//                 console.error("Error fetching livestock groups:", error);
//             }
//         };
    
//         fetchLivestockGroups();
//     }, []);
    

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         if (end < start) {
//             setError("End date cannot be earlier than start date.");
//             return;
//         }

//         setError('');
//         const data = { 
//             program_Name:programName, 
//             objective, 
//             start_date: startDate, 
//             end_date: endDate,
//             target_offspring_count: targetOffspringCount,
//             livestock_group_id: livestockGroupId,

//         };
        
//         // Call the onSubmit prop with the form data
//         onSubmit(data);
//         setSuccessMessage('Breeding Program saved successfully!');
//     };

//     return (
//         <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
//             <h2 className="text-xl font-bold mb-4">Create Breeding Program</h2>
            
//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Name</label>
//                 <input
//                     type="text"
//                     value={programName}
//                     onChange={(e) => setProgramName(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Objective</label>
//                 <textarea
//                     value={objective}
//                     onChange={(e) => setObjective(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                     rows="4"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Start Date</label>
//                 <input
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>

//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">End Date</label>
//                 <input
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Livestock Group</label>
//                 <select
//                     value={livestockGroupId}
//                     onChange={(e) => setLivestockGroupId(e.target.value)}
//                     required
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 >
//                     <option value="">Select Livestock Group</option>
//                     {livestockGroups.map(group => (
//                         <option key={group.id} value={group.id}>{group.name}</option>
//                     ))}
//                 </select>
//             </div>            <div className="mb-4">
//                 <label className="block text-gray-700 font-medium mb-2">Offspring Count</label>
//                 <input
//                     type="text"
//                     value={targetOffspringCount}
//                     onChange={(e) => setTargetOffspringCount(e.target.value)}
//                     className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
//                 />
//             </div>

//             {error && <p className="text-red-500 mb-4">{error}</p>}
//             {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

//             <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
//             >
//                 Save Breeding Program
//             </button>
//         </form>
//     );
// };

// export default BreedingProgramForm;







import { useState, useEffect } from 'react';

const BreedingProgramForm = ({ onSubmit, initialData = {} }) => {
    const [programName, setProgramName] = useState(initialData.program_name || '');    
    const [targetOffspringCount, setTargetOffspringCount] = useState(initialData.target_offspring_count || null);
    const [livestockGroupId, setLivestockGroupId] = useState(initialData.livestock_group_id || null);
    const [description, setDescription] = useState(initialData.description || '');
    const [startDate, setStartDate] = useState(initialData.start_date || '');
    const [endDate, setEndDate] = useState(initialData.end_date || '');
    const [livestockGroups, setLivestockGroups] = useState([]); // Holds list of livestock groups
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch livestock groups on component mount
    useEffect(() => {
        const fetchLivestockGroups = async () => {
            try {
                const response = await fetch('http://localhost:5173/api/livestock-groups');
                if (!response.ok) {
                    throw new Error("Failed to fetch livestock groups");
                }
                const data = await response.json();
                
                setLivestockGroups(data);
            } catch (error) {
                console.error("Error fetching livestock groups:", error);
            }
        };
    
        fetchLivestockGroups();
    }, []);

    const handleSubmit = async (e) => {
        console.log('Program successfully updated!');
    // You can handle additional logic here if needed
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        const updatedData = {
            program_name: programName,
            description: description,
            start_date: startDate,
            end_date: endDate,
            target_offspring_count: targetOffspringCount,
            livestock_group_id: livestockGroupId,
        };
        onSubmit(updatedData);

        const start = new Date(startDate);
        const end = new Date(endDate);

        if (end < start) {
            setError("End date cannot be earlier than start date.");
            return;
        }

        const data = { 
            program_name: programName, 
            description: description, 
            start_date: startDate, 
            end_date: endDate,
            target_offspring_count: targetOffspringCount,
            livestock_group_id: livestockGroupId,
        };

        console.log(initialData)
        try {            
            await onSubmit(data);
            setSuccessMessage('Breeding Program saved successfully!');
        } catch (error) {
            if (error.message.includes("program_name")) {
                setError("Program name must be unique. This name is already in use.");
            } else {
                setError("An error occurred while saving the program. Please try again.");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
            {/* Conditionally render form title */}
            <h2 className="text-xl font-bold mb-4">
                {initialData.id ? 'Edit Breeding Program' : 'Create Breeding Program'}
            </h2>
            
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Name</label>
                <input
                    type="text"
                    value={programName}
                    onChange={(e) => setProgramName(e.target.value)}
                    required
                    readOnly={!!initialData.id} // Make read-only if editing
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Objective</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                    rows="4"
                />
            </div>

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
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Livestock Group</label>
                <select
                    value={livestockGroupId}
                    onChange={(e) => setLivestockGroupId(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="">Select Livestock Group</option>
                    {livestockGroups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Offspring Count</label>
                <input
                    type="number"
                    value={targetOffspringCount}
                    onChange={(e) => setTargetOffspringCount(e.target.value)}
                    className="border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

            <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
                {initialData.id ? 'Update Breeding Program' : 'Save Breeding Program'}
            </button>
        </form>


    );
};

export default BreedingProgramForm;
