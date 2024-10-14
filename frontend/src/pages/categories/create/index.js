import axios from 'axios';
import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import '../../style.css';

function Create() {
    // State for form inputs
    const [category, setCategory] = useState({
        "name": "",
        "description": "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCategory({ ...category, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        const csrf_token = await axios.get('http://127.0.0.1:8000/api/csrf-token');
        const data_to_submit = {
            ...category,_token:csrf_token.data
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/categories/', data_to_submit);  // Replace with your API endpoint
            setSuccessMessage('category added successfully!');
            setCategory({
                "name": "",
                "description": "",
            }); // Reset form
        } catch (err) {
            setError('Failed to add category. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div>
    <Link to="/categories">Back</Link>
    <h2>Add New Category</h2>
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    {error && <p style={{ color: 'red' }}>{error}</p>}

    <form onSubmit={handleSubmit}>
        <table>
            <tbody>
                <tr>
                    <td>
                        <label htmlFor="name">Category Name:</label>
                    </td>
                    <td>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={category.name}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="description">Description:</label>
                    </td>
                    <td>
                        <textarea
                            id="description"
                            name="description"
                            value={category.description}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td colSpan="2">
                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Category'}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>

    );
}


export default Create;