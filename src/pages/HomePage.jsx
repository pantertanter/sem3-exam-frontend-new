import { Link } from "react-router-dom";

export default function Home() {
    return <>
        <h1>Home</h1>
        <p>Please <Link to="/login">login</Link> to see the jokes.</p>
    </>
}