import axios from 'axios';
import {
    useEffect,
    useLayoutEffect,
    useState
} from 'react';
import { Link, useParams,useNavigate } from 'react-router-dom';

function Details() {
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    let deletecategory = async ()=>{
        try{
            const response = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
            navigate(-1);
        }catch(error){
            console.log(error);
        }
    }
    useLayoutEffect(() => {
        // Make the GET request using axios
        axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
            .then((response) => {
                // Handle the response and set the JSON categories in the state
                setCategory(response.data);
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
            <Link to="/categories">Back</Link>
            <h1>Category Details</h1>
            <table border="1">
                <tbody>
                    <tr>
                        <th><Link to={`/categories/${id}/edit`}>Edit category</Link></th>
                        <th><button onClick={() => deletecategory()}>Delete category</button></th>
                    </tr>
                </tbody>
            </table>
            <hr/>
            <table border="1">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{category.id}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{category.name}</td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td>{category.description}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Details;