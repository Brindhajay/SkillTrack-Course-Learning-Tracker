import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar } from "react-icons/fa";
import {
    getFavoriteCourses,
    favoriteCourse
} from "../../services/courseService";
import "./Favorites.css";

function Favorites() {

    const navigate = useNavigate();

    const [courses, setCourses] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        let mounted = true;

        const loadFavorites = async () => {

            try {

                const data = await getFavoriteCourses();

                if (mounted) {
                    setCourses(data);
                }

            } catch (error) {

                console.error("Failed to load favorites:", error);

            } finally {

                if (mounted) {
                    setLoading(false);
                }

            }

        };

        loadFavorites();

        return () => {
            mounted = false;
        };

    }, []);

    const handleFavorite = async (e, id) => {

        e.stopPropagation();

        try {

            await favoriteCourse(id);

            setCourses((prev) =>
                prev.filter((course) => course.id !== id)
            );

        } catch (error) {

            console.error(error);

            alert("Failed to update favorite.");

        }

    };

    const filteredCourses = courses.filter((course) => {

        const title = course.title?.toLowerCase() || "";
        const instructor = course.instructor?.toLowerCase() || "";

        return (
            title.includes(search.toLowerCase()) ||
            instructor.includes(search.toLowerCase())
        );

    });

    if (loading) {

        return (
            <div className="favorites-loading">
                <h2>Loading...</h2>
            </div>
        );

    }

    return (

        <div className="favorites-container">

            <div className="favorites-header">

                <h2>❤️ Favorite Courses</h2>

                <input
                    type="text"
                    className="favorites-search"
                    placeholder="Search favorite courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            {filteredCourses.length === 0 ? (

                <div className="favorites-empty">

                    <h3>No favorite courses found.</h3>

                    <p>Add courses to favorites from Explore Courses.</p>

                    <button
                        className="browse-btn"
                        onClick={() => navigate("/courses")}
                    >
                        Browse Courses
                    </button>

                </div>

            ) : (

                <div className="course-grid">

                    {filteredCourses.map((course) => (

                        <div
                            key={course.id}
                            className="course-card"
                            onClick={() => navigate(`/courses/${course.id}`)}
                            style={{ cursor: "pointer" }}
                        >

                            <div className="course-image">

                                {course.imageUrl ? (

                                    <img
                                        src={course.imageUrl}
                                        alt={course.title}
                                    />

                                ) : (

                                    <div className="default-image">
                                        📚
                                    </div>

                                )}

                            </div>

                            <div className="course-body">

                                <h3>{course.title}</h3>

                                <p className="course-instructor">
                                    {course.instructor}
                                </p>

                                <div className="course-info">

                                    <span className="difficulty">
                                        {course.difficulty}
                                    </span>

                                    <span className="rating">
                                        <FaStar style={{ marginRight: "5px" }} />
                                        {course.rating}
                                    </span>

                                </div>

                                <div className="course-footer">

                                    <button
                                        type="button"
                                        className="enroll-btn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            navigate(`/courses/${course.id}`);

                                        }}
                                    >
                                        {course.enrolled ? "Continue" : "View"}
                                    </button>

                                    <button
                                        type="button"
                                        className="favorite-btn"
                                        onClick={(e) =>
                                            handleFavorite(e, course.id)
                                        }
                                    >
                                        <FaHeart color="#EF4444" />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default Favorites;