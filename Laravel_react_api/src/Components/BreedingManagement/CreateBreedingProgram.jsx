// import  { useState } from 'react';
// import BreedingProgramForm from './BreedingProgramForm';
// import BreedingProgramList from './BreedingProgramList';

// const CreateBreedingProgram = () => {
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handleCreate = async (data) => {
//         try {
//             const response = await fetch('/api/breeding-programs', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 const createdProgram = await response.json();
//                 console.log(createdProgram);
                
//                 setMessage('Breeding Program created successfully!');
//                 setError('');
//                 // Optionally refresh the program list or handle UI updates here
//             } else {
//                 const errorData = await response.json();
//                 console.log(errorData);
                
//                 setError(errorData.message || 'Failed to create breeding program');
//             }
//         } catch (error) {
//             setError('Error occurred while creating breeding program');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`/api/breeding-programs/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to delete breeding program');
//             }

//             // Optionally refresh the program list or handle UI updates here
//         } catch (error) {
//             console.error('Error deleting program:', error);
//         }
//     };

//     const fetchPrograms = async () => {
//         try {
//             const response = await fetch('/api/breeding-programs');
//             if (!response.ok) throw new Error('Failed to fetch programs');
//             const data = await response.json();
//             setPrograms(data); // Update state with fetched programs
//         } catch (error) {
//             console.error("Fetch error:", error);
//             setError(error.message);
//         }
//     };



//     return (
//         <div>
//             <h2>Create Breeding Program</h2>
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <BreedingProgramForm onSubmit={handleCreate} />
//             <BreedingProgramList onDelete={handleDelete} />
//         </div>
//     );
// };

// export default CreateBreedingProgram;




import  { useState, useEffect } from 'react';
import BreedingProgramForm from './BreedingProgramForm';
import BreedingProgramList from './BreedingProgramList';
import EditBreedingProgram from './EditBreedingProgram';

const CreateBreedingProgram = () => {
    const [programs, setPrograms] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Define fetchPrograms function
    const fetchPrograms = async () => {
        try {
            const response = await fetch('/api/breeding-programs');
            if (!response.ok) throw new Error('Failed to fetch programs');
            const data = await response.json();
            setPrograms(data); // Update state with fetched programs
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        }
    };

    // Fetch programs on component mount
    useEffect(() => {
        fetchPrograms();
    }, []);

    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/breeding-programs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                await fetchPrograms(); // Refresh the program list after creation
                setMessage('Breeding Program created successfully!');
                setError('');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to create breeding program');
            }
        } catch (error) {
            setError('Error occurred while creating breeding program');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/breeding-programs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) throw new Error('Failed to delete breeding program');

            await fetchPrograms(); // Refresh the program list after deletion
        } catch (error) {
            console.error("Error deleting program:", error);
        }
    };

    return (
        <div>
            <h2>Create Breeding Program</h2>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <BreedingProgramForm onSubmit={handleCreate} />
            <BreedingProgramList programs={programs} onDelete={handleDelete} />
            <EditBreedingProgram onSubmit={handleEditSubmit} />
        </div>
    );
};

export default CreateBreedingProgram;