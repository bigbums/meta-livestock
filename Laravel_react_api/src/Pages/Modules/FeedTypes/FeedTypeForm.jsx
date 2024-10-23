import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function FeedTypeForm() {
    const [formData, setFormData] = useState({
        feed_type_name: '',
        feed_type_desc: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/feed-types', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Feed Type saved successfully!');
                setFormData({ type_name: '', description: '' , variant_name: '' , notes: ''});
                navigate('/')
            } else {
                setError('Failed to save feed type');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="feed-type-form">
            <h2>Create Feed Type</h2>
            {error && <div className="error">{error}</div>}
            {successMessage && <div className="success">{successMessage}</div>}

            <form onSubmit={handleSubmit}>
                <label>
                    Feed Type Name:
                    <input
                        type="text"
                        name="feed_type_name"
                        value={formData.feed_type_name}
                        onChange={handleInputChange}
                        placeholder="e.g., Hay, Silage"
                    />
                </label>


                <label>
                    Description (Optional):
                    <textarea
                        name="feed_type_desc"
                        value={formData.feed_type_desc}
                        onChange={handleInputChange}
                        placeholder="Description of the feed type"
                    />
                </label>

                <button type="submit" disabled={loading}             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {loading ? 'Saving...' : 'Save Feed Type'}
                </button>


            </form>
        </div>
    );
}
