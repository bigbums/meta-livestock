import { useState, useEffect } from 'react';

export default function FeedsForm() {
    const [formData, setFormData] = useState({
        feed_name: '',
        feed_type_id: '', // Reference to feed type
        units_of_measure: '',
        quantity: ''
    });
    const [feedTypes, setFeedTypes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch feed types on component load
    useEffect(() => {
        const fetchFeedTypes = async () => {
            try {
                const response = await fetch('/api/feed-types');
                const data = await response.json();
                setFeedTypes(data);
            } catch (error) {
                setError('Failed to load feed types');
            }
        };

        fetchFeedTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/feeds', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Feed saved successfully!');
                setFormData({ feed_name: '', feed_type_id: '', units_of_measure: '', quantity: '' });
            } else {
                setError('Failed to save feed');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feed-form">
            <h2>Create Feed</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    Feed Name:
                    <input
                        type="text"
                        name="feed_name"
                        value={formData.feed_name}
                        onChange={handleInputChange}
                        placeholder="e.g., Alfalfa, Silage"
                    />
                </label>

                <label>
                    Feed Type:
                    <select
                        name="feed_type_id"
                        value={formData.feed_type_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Feed Type</option>
                        {feedTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.type_name}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Units of Measure:
                    <input
                        type="text"
                        name="units_of_measure"
                        value={formData.units_of_measure}
                        onChange={handleInputChange}
                        placeholder="e.g., kg, liter"
                    />
                </label>

                <label>
                    Quantity:
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Feed'}
                </button>
            </form>
        </div>
    );
}
