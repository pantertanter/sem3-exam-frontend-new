import { Route, Routes } from "react-router-dom";
import Jokes from '../components/admin_tables/Jokes'
import AdminNavBar from "../components/nav/AdminNavBar";

function AdminPage() {

    return (
        <div>
            <AdminNavBar />
            <Routes>
            <Route path="jokes" element={<Jokes />} />
            </Routes>
        </div>
    );
}

export default AdminPage;
