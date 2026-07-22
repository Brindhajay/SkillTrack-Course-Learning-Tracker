import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getEnrolledCourses } from "../../services/courseService";
import "./MyLearning.css";

function MyLearning() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("status");

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        let data = await getEnrolledCourses();

        if (statusFilter) {
          data = data.filter((course) => course.status === statusFilter);
        }

        setCourses(data);
      } catch (error) {
        console.error("Error loading enrolled courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [statusFilter]);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase()),
  );

  const getTitle = () => {
    switch (statusFilter) {
      case "IN_PROGRESS":
        return "In Progress Courses";

      case "COMPLETED":
        return "Completed Courses";

      default:
        return "Continue Learning Courses📈";
    }
  };

  if (loading) {
    return (
      <div className="learning-page">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="learning-page">
      <div className="learning-header">
        <h2>{getTitle()}</h2>

        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredCourses.length === 0 ? (
        <div className="empty-state">
          <h3>No courses found.</h3>

          <p>No courses match the selected filter.</p>
        </div>
      ) : (
        <div className="learning-grid">
          {filteredCourses.map((course) => (
            <div key={course.id} className="learning-card">
              <div className="learning-image">
                {course.imageUrl ? (
                  <img src={course.imageUrl} alt={course.title} />
                ) : (
                  <div className="default-image">📚</div>
                )}
              </div>

              <div className="learning-content">
                <h3>{course.title}</h3>

                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>

                <p>
                  <strong>Platform:</strong> {course.platform}
                </p>

                <p>
                  <strong>Difficulty:</strong> {course.difficulty}
                </p>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${course.progressPercentage}%`,
                    }}
                  />
                </div>

                <p>
                  <strong>Progress:</strong> {course.progressPercentage}%
                </p>

                <button
                  className={`continue-btn ${
                    course.progressPercentage >= 100 ? "completed-btn" : ""
                  }`}
                  disabled={course.progressPercentage >= 100}
                  onClick={() => {
                    if (course.progressPercentage < 100) {
                      navigate(`/courses/${course.id}`);
                    }
                  }}
                >
                  {course.progressPercentage >= 100
                    ? "✅ Course Completed"
                    : "Continue Learning"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLearning;
