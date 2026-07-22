import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1">

                <Navbar />

                <main className="p-4 bg-light min-vh-100">

                    <Outlet />

                </main>

            </div>

        </div>
    );
}

export default MainLayout;