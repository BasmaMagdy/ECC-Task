import axios from 'axios';
import {
    useLayoutEffect,
    useState
} from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../style.css';

function Edit() {
    // State for form inputs
    const [category,setCategory] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [successMessage, setSuccessMessage] = useState(null);
    useLayoutEffect(()=>{            
        let getcategory = async () => {
            try{
                let response = await axios.get("http://127.0.0.1:8000/api/categories/"+id);
                setCategory({...response.data});
            }catch(error){
                console.log(error);
                setError("Network Error while fetching the category");
            }
        }
        getcategory();
        setLoading(false);
    },[]);
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
            const response = await axios.put(`http://127.0.0.1:8000/api/categories/${id}`, data_to_submit);  // Replace with your API endpoint
            setSuccessMessage('category edited successfully!');
        } catch (err) {
            setError('Failed to edit category. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if(isLoading) return "Still Loading...";

    return (
        <div>
    <Link to="/categories">Back</Link>
    <h2>Edit Category</h2>
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
                            {isSubmitting ? 'Editing...' : 'Edit Category'}
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </form>
</div>

    );
}


export default Edit;