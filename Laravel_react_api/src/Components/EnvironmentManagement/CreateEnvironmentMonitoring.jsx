// import  { useState, useEffect } from 'react';
// import EnvironmentMonitoringForm from './EnvironmentMonitoringForm';
// import EnvironmentMonitoringList from './EnvironmentMonitoringList';
// import EditEnvironmentMonitoring from './EditEnvironmentMonitoring';

// const CreateEnvironmentMonitoring = () => {
//     const [monitoring, setmonitoring] = useState([]);
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     // Define fetchPrograms function
//     const fetchMonitoring = async () => {
//         try {
//             const response = await fetch('/api/environment-monitoring');
//             if (!response.ok) throw new Error('Failed to fetch programs');
//             const data = await response.json();
//             setmonitoring(data); // Update state with fetched programs
//         } catch (error) {
//             console.error("Fetch error:", error);
//             setError(error.message);
//         }
//     };

//     // Fetch programs on component mount
//     useEffect(() => {
//         fetchMonitoring();
//     }, []);

//     const handleCreate = async (data) => {
//         try {
//             const response = await fetch('/api/environment-monitoring', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (response.ok) {
//                 await fetchMonitoring(); // Refresh the program list after creation
//                 setMessage('Monitoring data created successfully!');
//                 setError('');
//             } else {
//                 const errorData = await response.json();
//                 setError(errorData.message || 'Failed to create monitoring data');
//             }
//         } catch (error) {
//             setError('Error occurred while creating breeding program');
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             const response = await fetch(`/api/environment-monitoring/${id}`, {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) throw new Error('Failed to delete breeding program');

//             await fetchMonitoring(); // Refresh the program list after deletion
//         } catch (error) {
//             console.error("Error deleting program:", error);
//         }
//     };

//     return (
//         <div>
//             <h2>Create Breeding Program</h2>
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <EnvironmentMonitoringForm onSubmit={handleCreate} />
//             <EnvironmentMonitoringList monitoring={monitoring} onDelete={handleDelete} />
//             <EditEnvironmentMonitoring onSubmit={handleEditSubmit} />
//         </div>
//     );
// };

// export default CreateEnvironmentMonitoring;