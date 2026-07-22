import {
    FaHome,
    FaBookOpen,
    FaGraduationCap,
    FaHeart,
    FaUser,
    FaSignOutAlt,
    FaPlusCircle
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };

    const menuItems = [

        {
            name: "Dashboard",
            path: "/dashboard",
            icon: <FaHome />
        },

        {
            name: "Explore Courses",
            path: "/courses",
            icon: <FaBookOpen />
        },

        {
            name: "My Learning",
            path: "/learning",
            icon: <FaGraduationCap />
        },

        {
            name: "Create Course",
            path: "/create-course",
            icon: <FaPlusCircle />
        },

        {
            name: "Favorites",
            path: "/favorites",
            icon: <FaHeart />
        },

        {
            name: "Profile",
            path: "/profile",
            icon: <FaUser />
        }

    ];

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                📚 SkillTrack

            </div>

            <nav className="sidebar-menu">

                {

                    menuItems.map((item) => (

                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar-link active"
                                    : "sidebar-link"
                            }
                        >

                            <span className="sidebar-icon">

                                {item.icon}

                            </span>

                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    ))

                }

            </nav>

            <div className="sidebar-footer">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    <span>

                        Logout

                    </span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;