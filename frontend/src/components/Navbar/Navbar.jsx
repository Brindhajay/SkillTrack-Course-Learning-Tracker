import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/dashboard") return "Dashboard";

    if (path === "/courses") return "Explore Courses";

    if (path.startsWith("/courses/")) return "Course Details";

    if (path === "/learning") return "My Learning";

    if (path === "/favorites") return "Favorites";

    if (path === "/profile") return "My Profile";

    if (path === "/create-course") return "Create Course";

    if (path.startsWith("/create-course/")) return "Edit Course";

    return "SkillTrack";
  };
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search.trim() === "") return;

    const timer = setTimeout(() => {
      navigate(`/courses?search=${encodeURIComponent(search.trim())}`);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, navigate]);

  const handleSearch = () => {
    if (search.trim() === "") {
      navigate("/courses");
    } else {
      navigate(`/courses?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h4>{getPageTitle()}</h4>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          value={search}
          placeholder="Search courses..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <div className="navbar-profile" onClick={() => navigate("/profile")}>
        <FaUserCircle size={40} />

        <span>{user?.fullName || "User"}</span>
      </div>
    </div>
  );
}

export default Navbar;
