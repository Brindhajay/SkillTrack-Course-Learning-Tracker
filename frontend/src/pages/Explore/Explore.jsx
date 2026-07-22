import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllCourses } from "../../services/courseService";
import Course from "../../components/course/Course";
import "./Explore.css";

function Explore() {
  const [courses, setCourses] = useState([]);

  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getAllCourses(search);

        setCourses(data.content || []);
      } catch (error) {
        console.error("Error loading courses:", error);
      }
    };

    fetchCourses();
  }, [search]);

  return (
    <div className="courses-page">
      <h2>
        {search ? `Search Results for "${search}"` : "Explore Your Courses📚"}
      </h2>

      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => <Course key={course.id} course={course} />)
        ) : (
          <div className="no-course">
            <h3>No Courses Found</h3>

            <p>Create your first course 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Explore;
