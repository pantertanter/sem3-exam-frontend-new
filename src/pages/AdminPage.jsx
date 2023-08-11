import { Route, Routes } from "react-router-dom";
import Jokes from '../components/admin_tables/Jokes'
import AdminNavBar from "../components/nav/AdminNavBar";
import AllJokes from "../components/admin_tables/AllJokes";
import JokesByCat from "../components/admin_tables/JokesByCat";

function AdminPage() {

    return (
        <div>
            <AdminNavBar />
            <Routes>
            <Route path="Jokes" element={<Jokes />} />
            <Route path="AllJokes" element={<AllJokes />} />
            <Route path="JokesByCat" element={<JokesByCat />} />


            </Routes>
        </div>
    );
}

export default AdminPage;
