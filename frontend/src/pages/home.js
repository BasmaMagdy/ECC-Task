import { Link } from "react-router-dom";
import "./style.css";

function Home(){
    return (
        <>

            <div class="container">
                <h1><Link to="/categories">Categories</Link></h1>
                <h1><Link to="/products">products</Link></h1>
            </div>
        </>
    );
}

export default Home;