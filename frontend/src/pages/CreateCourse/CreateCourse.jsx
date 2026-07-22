import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  createCourse,
  updateCourse,
  getCourseById,
} from "../../services/courseService";
import "./CreateCourse.css";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    category: "",
    instructor: "",
    duration: "",
    difficulty: "",
    priority: "MEDIUM",
    status: "PLANNED",
    progress: 0,
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    if (!isEdit) return;

    const loadCourse = async () => {
      try {
        const data = await getCourseById(id);

        setCourse({
          title: data.title || "",

          description: data.description || "",

          category: data.category || "",

          instructor: data.instructor || "",

          duration: data.durationHours || "",

          difficulty: data.difficulty || "",

          priority: data.priority || "MEDIUM",

          status: data.status || "PLANNED",

          progress: data.progressPercentage || 0,

          startDate: data.startDate || "",

          endDate: data.targetCompletionDate || "",
        });
      } catch (err) {
        console.error(err);

        alert("Unable to load course.");
      }
    };

    loadCourse();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: course.title.trim(),
        instructor: course.instructor.trim(),
        platform: "SkillTrack",
        category: course.category.trim(),
        description: course.description.trim(),

        difficulty: course.difficulty,

        durationHours: Number(course.duration),

        rating: 0.0,

        imageUrl: "",

        enrolled: false,

        favorite: false,

        status: course.status,

        progressPercentage: Number(course.progress),

        priority: course.priority,

        startDate: course.startDate || null,

        targetCompletionDate: course.endDate || null,

        lastAccessedDate: null,

        completionDate: null,

        certificateUrl: "",

        notes: "",
      };

      console.log(payload);

      if (isEdit) {
        await updateCourse(id, payload);

        alert("Course Updated Successfully ✅");
      } else {
        await createCourse(payload);

        alert("Course Created Successfully ✅");
      }

      navigate("/courses");
    } catch (error) {
      console.error(error);

      console.log(error.response?.data);

      alert(error.response?.data?.message || "Validation failed");
    }
  };

  return (
    <div className="create-course-page">
      <div className="create-course-card">
        <div className="page-header">
          <h2>{isEdit ? "Edit Course" : "Create New Course"}</h2>

          <p>
            {isEdit
              ? "Update your learning course."
              : "Add a new learning course to SkillTrack."}
          </p>
        </div>

        <form className="create-course-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-grid">
              <div>
                <label>Course Title</label>

                <input
                  type="text"
                  name="title"
                  value={course.title}
                  onChange={handleChange}
                  placeholder="React Masterclass"
                  required
                />
              </div>

              <div>
                <label>Instructor</label>

                <input
                  type="text"
                  name="instructor"
                  value={course.instructor}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label>Category</label>

                <input
                  type="text"
                  name="category"
                  value={course.category}
                  onChange={handleChange}
                  placeholder="Web Development"
                  required
                />
              </div>

              <div>
                <label>Duration</label>

                <input
                  type="number"
                  name="duration"
                  min="1"
                  value={course.duration}
                  onChange={handleChange}
                  placeholder="25"
                  required
                />
              </div>

              <div>
                <label>Difficulty</label>

                <select
                  name="difficulty"
                  value={course.difficulty}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="BEGINNER">Beginner</option>
                  <option value="INTERMEDIATE">Intermediate</option>
                  <option value="ADVANCED">Advanced</option>
                </select>
              </div>

              <div>
                <label>Priority</label>

                <select
                  name="priority"
                  value={course.priority}
                  onChange={handleChange}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </select>
              </div>
              <div>
                <label>Status</label>

                <select
                  name="status"
                  value={course.status}
                  onChange={handleChange}
                >
                  <option value="PLANNED">Planned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="ON_HOLD">On Hold</option>
                </select>
              </div>

              <div>
                <label>Progress (%)</label>

                <input
                  type="number"
                  name="progress"
                  min="0"
                  max="100"
                  value={course.progress}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>Start Date</label>

                <input
                  type="date"
                  name="startDate"
                  value={course.startDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label>End Date</label>

                <input
                  type="date"
                  name="endDate"
                  value={course.endDate}
                  onChange={handleChange}
                />
              </div>

              <div className="full-width">
                <label>Description</label>

                <textarea
                  rows="6"
                  name="description"
                  value={course.description}
                  onChange={handleChange}
                  placeholder="Enter course description..."
                  required
                />
              </div>
            </div>
          </div>

          <div className="button-group">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {isEdit ? "Update Course" : "Create Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
