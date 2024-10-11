import axios from 'axios';
import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';

function Create() {
    // State for form inputs
    const [product, setProduct] = useState({
        "name": "",
        "description": "",
        "code": "",
        "image": "",
        "price": 0,
        "quantity": 0,
        "category_id": 1,
    });
    const [isLoading,setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [categories,setCategories] = useState(null);
    useEffect(()=>{
        let getCategories = async () => {
            try{
                let response = await axios.get("http://127.0.0.1:8000/api/categories");
                setCategories([...response.data]);
                setLoading(false);
            }catch(error){
                console.log(error);
                setError("Network Error while fetching categories!");
            }
        }
        getCategories();
    },[]);
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setError(null);
        setSuccessMessage(null);
        const csrf_token = await axios.get('http://127.0.0.1:8000/api/csrf-token');
        const data_to_submit = {
            ...product,_token:csrf_token.data
        };
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/products/', data_to_submit);  // Replace with your API endpoint
            setSuccessMessage('Product added successfully!');
            setProduct({
                "name": "",
                "description": "",
                "code": "",
                "image": "",
                "price": 0,
                "quantity": 0,
                "category_id": 1,
            }); // Reset form
        } catch (err) {
            setError('Failed to add product. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    if(isLoading) return "Still loading...";
    return (
        <div>
            <Link to="/products">Back</Link>
            <h2>Add New Product</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Product Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <br />
                    <textarea
                        id="description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="code">Code:</label>
                    <br />
                    <input
                        type="text"
                        id="code"
                        name="code"
                        value={product.code}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="image">Image:</label>
                    <br />
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <br />
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="quantity">quantity:</label>
                    <br />
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category">category:</label>
                    <br />
                    <select
                        id="category"
                        name="category_id"
                        value={product.category_id}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </form>
        </div>
    );
}


export default Create;