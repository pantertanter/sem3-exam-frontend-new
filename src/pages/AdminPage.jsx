import { Route, Routes } from "react-router-dom";
import ConferenceTable from "../components/admin_tables/ConferenceTable";
import SpeakerTable from "../components/admin_tables/SpeakerTable";
import TalkTable from "../components/admin_tables/TalkTable";
import AdminNavBar from "../components/nav/AdminNavBar";

function AdminPage() {

    return (
        <div>
            <AdminNavBar />
            <Routes>
                <Route path="conferences" element={<ConferenceTable />} />
                <Route path="talks" element={<TalkTable />} />
                <Route path="speakers" element={<SpeakerTable />} />
            </Routes>
        </div>
    );
}

export default AdminPage;
