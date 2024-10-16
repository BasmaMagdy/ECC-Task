import axios from 'axios';
import {
    useEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import '../style.css'

function Home() {
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make the GET request using axios
        axios.get('http://127.0.0.1:8000/api/categories')
            .then((response) => {
                // Handle the response and set the JSON categories in the state
                setCategories(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // Handle any errors
                setError(error);
                setLoading(false);
            });
    }); // Empty dependency array to make the request once after component mounts

    if (loading) return <p> Loading... </p>;
    if (error) return <p> Error: {
        error.message
    } </p>;

    return (
        <>
            <h2>
                <Link to="/">back</Link> &nbsp;
                <Link to="/categories/create">Create category</Link>
            </h2>
            <h1>Categories</h1>
            <table className="category-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td>
                                <Link to={`/categories/${category.id}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;