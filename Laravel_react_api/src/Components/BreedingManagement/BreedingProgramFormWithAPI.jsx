// import BreedingProgramForm from './BreedingProgramForm';
// import BreedingProgramList from './BreedingProgramList';
// import { useState } from 'react';

// const BreedingProgramWithAPI = () => {
//     const [programs, setPrograms] = useState([]);

//     const onSubmit = async (data) => {
//         try {
//             const response = await fetch('/api/breeding-programs', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create breeding program');
//             }

//             const newProgram = await response.json();
//             setPrograms((prevPrograms) => [...prevPrograms, newProgram]); // Update list with new program
//         } catch (error) {
//             console.error('Error creating program:', error);
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
            
//             setPrograms((prevPrograms) => prevPrograms.filter(program => program.id !== id)); // Update list after deletion
//         } catch (error) {
//             console.error('Error deleting program:', error);
//         }
//     };

//     return (
//         <div>
//             <BreedingProgramForm onSubmit={onSubmit} />
//             <BreedingProgramList programs={programs} onDelete={handleDelete} />
//         </div>
//     );
// };

// export default BreedingProgramWithAPI;




import React from 'react';
import BreedingProgramForm from './BreedingProgramForm';
import BreedingProgramList from './BreedingProgramList';

const BreedingProgramWithAPI = () => {
    const handleCreate = async (data) => {
        try {
            const response = await fetch('/api/breeding-programs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to create breeding program');
            }

            // Optionally refresh the program list or handle UI updates here
        } catch (error) {
            console.error('Error creating program:', error);
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

            if (!response.ok) {
                throw new Error('Failed to delete breeding program');
            }

            // Optionally refresh the program list or handle UI updates here
        } catch (error) {
            console.error('Error deleting program:', error);
        }
    };

    return (
        <div>
            <BreedingProgramForm onSubmit={handleCreate} />
            <BreedingProgramList onDelete={handleDelete} />
        </div>
    );
};

export default BreedingProgramWithAPI;