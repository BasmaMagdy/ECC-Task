import axios from 'axios';
import {
    useEffect,
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const q = useRef(null);
    const getProducts = (q="") => {
        let url = q == "" ? "http://127.0.0.1:8000/api/products" : `http://127.0.0.1:8000/api/products/search?q=${q}`;
        axios.get(url)
            .then((response) => {
                // Handle the response and set the JSON products in the state
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                // Handle any errors
                setError(error);
                setLoading(false);
            });
    }
    useLayoutEffect(() => {
        getProducts();
        // Make the GET request using axios
        
    },[]); // Empty dependency array to make the request once after component mounts
    const handleSubmit = async (e) => {
        e.preventDefault();
        let query = q.current.value;
        getProducts(query);
    }
    if (loading) return <p> Loading... </p>;
    if (error) return <p> Error: {
        error.message
    } </p>;

    return (
        <>
            <h2>
                <Link to="/">back</Link> &nbsp;
                <Link to="/products/create">Create Product</Link>
            </h2>
            <form onSubmit={handleSubmit}>
                <label>Search</label>
                <input name="Search" id="Search" ref={q} />
                <button type="submit">Search</button>
            </form>
            <h1>Products</h1>
            <ul>
                {products && products.map(product => (
                    <li key={product.id} >
                        <Link to={`/products/${product.id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>

        </>
    );
}

export default Home;