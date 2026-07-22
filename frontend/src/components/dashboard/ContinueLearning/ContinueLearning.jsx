import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContinueLearning.css";
import { getEnrolledCourses } from "../../../services/courseService";

function ContinueLearning() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getEnrolledCourses();

        const continueCourses = data.filter(
          (course) => course.enrolled && course.progressPercentage < 100,
        );

        setCourses(continueCourses);
      } catch (error) {
        console.error("Error loading continue learning:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="continue-card">
        <h3>Continue Learning</h3>

        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="continue-card">
      <h3>Continue Learning</h3>

      {courses.length === 0 ? (
        <p>No courses in progress.</p>
      ) : (
        courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-details">
              <h5>{course.title}</h5>

              <p>Progress : {course.progressPercentage ?? 0}%</p>

              <div className="learning-progress">
                <div
                  className="learning-progress-fill"
                  style={{
                    width: `${course.progressPercentage ?? 0}%`,
                  }}
                />
              </div>
            </div>

            <button onClick={() => navigate(`/courses/${course.id}`)}>
              Resume
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ContinueLearning;
