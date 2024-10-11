import axios from 'axios';
import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';

function Details() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories,setCategories] = useState([]);
    let deleteProduct = async ()=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
            navigate(-1);
        }catch(error){
            console.log(error);
        }
    }
    useLayoutEffect(() => {
        // Make the GET request using axios
        let getCategories = async () => {
            try{
                let response = await axios.get("http://127.0.0.1:8000/api/categories");
                setCategories([...response.data]);
            }catch(error){
                console.log(error);
                setError("Network Error while fetching categories!");
            }
        }

        axios.get(`http://127.0.0.1:8000/api/products/${id}`)
            .then((response) => {
                // Handle the response and set the JSON products in the state
                setProduct(response.data);
                getCategories();
                setLoading(false);
            })
            .catch((error) => {
                // Handle any errors
                setError(error);
                setLoading(false);
            });
    },[]); // Empty dependency array to make the request once after component mounts
    if (loading) return <p> Loading... </p>;
    if (error) return <p> Error: {
        error.message
    } </p>;

    return (
        <>
            <Link to="/products">Back</Link>
            <h1>Product Details</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th><Link to={`/products/${id}/edit`}>Edit Product</Link></th>
                        <th><button onClick={() => deleteProduct()}>Delete Product</button></th>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <table border="1">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{product.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{product.name}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{product.description}</td>
                    </tr>
                    <tr>
                        <th>Code</th>
                        <td>{product.code}</td>
                    </tr>
                    <tr>
                        <th>Price</th>
                        <td>{product.price}</td>
                    </tr>
                    <tr>
                        <th>Quantity</th>
                        <td>{product.quantity}</td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>{
                            (categories.filter(cat => cat.id== product.category_id))?.[0]?.name ?? ""}</td>
                    </tr>
                    <tr>
                        <th>Created At</th>
                        <td>{product.created_at}</td>
                    </tr>
                    <tr>
                        <th>Last Updated Data at</th>
                        <td>{product.updated_at}</td>
                    </tr>
                    <tr>
                        <th>Image</th>
                        <td><img src={product.image} alt="Of data" /></td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Details;