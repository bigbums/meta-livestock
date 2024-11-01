
import { useState, useEffect } from 'react';

const FeedDistributionForm = () => {
    const [scheduleId, setScheduleId] = useState('');
    const [livestockGroupId, setLivestockGroupId] = useState('');
    const [livestockId, setLivestockId] = useState('');
    const [actualFeedingTime, setActualFeedingTime] = useState('');
    const [quantityDistributed, setQuantityDistributed] = useState('');
    const [variance, setVariance] = useState('');
    const [schedules, setSchedules] = useState([]);
    const [livestockGroups, setLivestockGroups] = useState([]);
    const [livestocks, setLivestocks] = useState([]);
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        fetchSchedules();
        fetchLivestockGroups();
        fetchLivestocks();
    }, []);

    const fetchSchedules = async () => {
        const res = await fetch("/api/feed-schedules");
        if (res.ok) {
            const data = await res.json();
            setSchedules(data);
            console.log(data)
        } else {
            console.error("Failed to fetch schedules");
        }
    };

    const fetchLivestockGroups = async () => {
        const res = await fetch("/api/livestock-groups");
        if (res.ok) {
            setSuccessMessage('Feed distribution saved successfully');
            const data = await res.json();
            setLivestockGroups(data);
            console.log(data);
        } else {
            console.error("Failed to fetch livestock groups");
        }
    };

    const fetchLivestocks = async () => {
        const res = await fetch("/api/livestocks/list");
        if (res.ok) {
            const data = await res.json();
            setLivestocks(data);
        } else {
            console.error("Failed to fetch livestocks");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            feed_schedule_id: scheduleId,
            livestock_group_id: livestockGroupId || null,
            livestock_id: livestockId || null,
            distribution_time: actualFeedingTime,
            actual_quantity_distributed: quantityDistributed,
            variance
        };

        try {
            const response = await fetch('/api/feed-distribution', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Feed distribution saved:", data);
            } else {
                console.error("Error saving feed distribution:", response.statusText);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            {successMessage && <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">{successMessage}</div>}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-semibold">Schedule:</label>
                    <select 
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        value={scheduleId} 
                        onChange={(e) => setScheduleId(e.target.value)}
                    >
                        <option value="">Select a schedule</option>
                        {schedules.map((schedule) => (
                            <option key={schedule.id} value={schedule.id}>{schedule.approver}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Livestock Group (optional):</label>
                    <select 
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        value={livestockGroupId} 
                        onChange={(e) => setLivestockGroupId(e.target.value)}
                    >
                        <option value="">Select a livestock group</option>
                        {livestockGroups.map((group) => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Individual Livestock (optional):</label>
                    <select 
                        className="w-full mt-1 p-2 border border-gray-300 rounded"
                        value={livestockId} 
                        onChange={(e) => setLivestockId(e.target.value)}
                    >
                        <option value="">Select a livestock</option>
                        {livestocks.map((livestock) => (
                            <option key={livestock.id} value={livestock.id}>{livestock.tag_id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Actual Feeding Time:</label>
                    <input 
                        type="datetime-local" 
                        className="w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={actualFeedingTime} 
                        onChange={(e) => setActualFeedingTime(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Quantity Distributed:</label>
                    <input 
                        type="number" 
                        className="w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={quantityDistributed} 
                        onChange={(e) => setQuantityDistributed(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold">Variance (optional):</label>
                    <input 
                        type="number" 
                        className="w-full mt-1 p-2 border border-gray-300 rounded" 
                        value={variance} 
                        onChange={(e) => setVariance(e.target.value)} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                    Save Distribution
                </button>
            </form>
        </div>
    );
};

export default FeedDistributionForm;
