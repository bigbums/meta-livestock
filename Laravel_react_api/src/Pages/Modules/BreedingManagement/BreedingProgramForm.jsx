import { useState } from 'react';

const BreedingProgramForm = ({ onSubmit, initialData = {} }) => {
    const [name, setName] = useState(initialData.name || '');
    const [objective, setObjective] = useState(initialData.objective || '');
    const [startDate, setStartDate] = useState(initialData.start_date || '');
    const [endDate, setEndDate] = useState(initialData.end_date || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { name, objective, start_date: startDate, end_date: endDate };
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Objective</label>
                <textarea value={objective} onChange={(e) => setObjective(e.target.value)} required />
            </div>
            <div>
                <label>Start Date</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div>
                <label>End Date</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button type="submit">Save Breeding Program</button>
        </form>
    );
};

export default BreedingProgramForm;
