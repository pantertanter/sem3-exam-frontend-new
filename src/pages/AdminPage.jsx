import { Route, Routes } from "react-router-dom";
import Jokes from '../components/admin_tables/Jokes'
import AdminNavBar from "../components/nav/AdminNavBar";
import AllJokes from "../components/admin_tables/AllJokes";

function AdminPage() {

    return (
        <div>
            <AdminNavBar />
            <Routes>
            <Route path="jokes" element={<Jokes />} />
            <Route path="AllJokes" element={<AllJokes />} />

            </Routes>
        </div>
    );
}

export default AdminPage;
