import { Link } from "react-router-dom";
function Home(){
    return (
        <>
            <h1><Link to="/categories">Categories</Link></h1>
            <h1><Link to="/products">products</Link></h1>
        </>
    );
}

export default Home;