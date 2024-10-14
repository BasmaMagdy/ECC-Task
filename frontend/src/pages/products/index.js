import axios from 'axios';
import {
    useLayoutEffect,
    useRef,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Home() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const q = useRef(null);
    const getProducts = (q="") => {
        let url = q === "" ? "http://127.0.0.1:8000/api/products" : `http://127.0.0.1:8000/api/products/search?q=${q}`;
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
                <input name="Search" id="Search" placeholder='Search' ref={q} />
                <button type="submit">Search</button>
            </form>
            <h1>Products</h1>
            <table className="products-table">
  <thead>
    <tr>
      <th>Product Name</th>
    </tr>
  </thead>
  <tbody>
    {products && products.map(product => (
      <tr key={product.id}>
        <td>
          <Link to={`/products/${product.id}`}>
            {product.name}
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        </>
    );
}

export default Home;