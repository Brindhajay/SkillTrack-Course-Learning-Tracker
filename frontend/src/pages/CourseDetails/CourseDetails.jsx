import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getCourseById,
  enrollCourse,
  favoriteCourse,
  updateProgress,
} from "../../services/courseService";

import {
  FaBookOpen,
  FaUser,
  FaLayerGroup,
  FaClock,
  FaStar,
  FaCalendarAlt,
  FaHeart,
  FaRegHeart,
  FaSignal,
  FaFlag,
  FaArrowLeft,
  FaEdit,
} from "react-icons/fa";

import "./CourseDetails.css";

function CourseDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const loadCourse = useCallback(async () => {
    try {
      const data = await getCourseById(id);

      setCourse(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load course.");

      navigate("/courses");
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    // call loadCourse inside an async IIFE to avoid calling setState synchronously in the effect body
    (async () => {
      try {
        await loadCourse();
      } catch {
        // swallow - loadCourse already handles errors
      }
    })();
  }, [id, loadCourse]);

  const handleEnroll = async () => {
    try {
      await enrollCourse(course.id);

      loadCourse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = async () => {
    try {
      await favoriteCourse(course.id);

      loadCourse();
    } catch (error) {
      console.error(error);
    }
  };

  const handleProgress = async (change) => {
    let newProgress = (course.progressPercentage ?? 0) + change;

    if (newProgress < 0) newProgress = 0;

    if (newProgress > 100) newProgress = 100;

    try {
      await updateProgress(course.id, newProgress);

      setCourse((prev) => ({
        ...prev,
        progressPercentage: newProgress,
      }));
    } catch (error) {
      console.error(error);

      alert("Unable to update progress.");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  if (!course) {
    return <h2 className="loading">Course Not Found</h2>;
  }

  return (
    <div className="course-details-page">
      <div className="details-top">
        <button className="back-btn" onClick={() => navigate("/courses")}>
          <FaArrowLeft />
          Back
        </button>

        <button
          className="edit-btn"
          onClick={() => navigate(`/create-course/${course.id}`)}
        >
          <FaEdit />
          Edit
        </button>
      </div>

      <div className="details-card">
        <div className="details-banner">
          {course.imageUrl ? (
            <img src={course.imageUrl} alt={course.title} />
          ) : (
            <div className="default-cover">📘</div>
          )}
        </div>

        <div className="details-content">
          <h1>{course.title}</h1>

          <p className="details-description">{course.description}</p>

          <div className="badge-row">
            <span className="badge">
              <FaLayerGroup />

              {course.category}
            </span>

            <span className="badge">
              <FaSignal />

              {course.difficulty}
            </span>

            <span className="badge">
              <FaFlag />

              {course.priority}
            </span>

            <span className="badge">{course.status}</span>
          </div>

          <div className="info-grid">
            <div className="info-box">
              <FaUser />

              <div>
                <label>Instructor</label>

                <span>{course.instructor}</span>
              </div>
            </div>

            <div className="info-box">
              <FaBookOpen />

              <div>
                <label>Platform</label>

                <span>{course.platform}</span>
              </div>
            </div>

            <div className="info-box">
              <FaClock />

              <div>
                <label>Duration</label>

                <span>{course.durationHours} Hours</span>
              </div>
            </div>

            <div className="info-box">
              <FaStar />

              <div>
                <label>Rating</label>

                <span>{course.rating ?? 0}</span>
              </div>
            </div>

            <div className="info-box">
              <FaCalendarAlt />

              <div>
                <label>Start Date</label>

                <span>{course.startDate || "-"}</span>
              </div>
            </div>

            <div className="info-box">
              <FaCalendarAlt />

              <div>
                <label>Target Date</label>

                <span>{course.targetCompletionDate || "-"}</span>
              </div>
            </div>
          </div>
          <div className="progress-section">
            <div className="progress-title">
              <span>Learning Progress</span>

              <strong>{course.progressPercentage ?? 0}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${course.progressPercentage ?? 0}%`,
                }}
              />
            </div>

            <div className="progress-buttons">
              <button
                className="progress-btn"
                onClick={() => handleProgress(-5)}
              >
                −5%
              </button>

              <button
                className="progress-btn"
                onClick={() => handleProgress(5)}
              >
                +5%
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="enroll-btn" onClick={handleEnroll}>
              {course.enrolled ? "Enrolled ✅" : "Enroll Course"}
            </button>

            <button
              className={`favorite-btn ${course.favorite ? "active" : ""}`}
              onClick={handleFavorite}
              title={course.favorite ? "Remove Favorite" : "Add Favorite"}
            >
              {course.favorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>

          {course.notes && (
            <div className="notes-box">
              <h3>Notes</h3>

              <p>{course.notes}</p>
            </div>
          )}

          {course.certificateUrl && (
            <div className="certificate-box">
              <h3>Certificate</h3>

              <a href={course.certificateUrl} target="_blank" rel="noreferrer">
                View Certificate
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
