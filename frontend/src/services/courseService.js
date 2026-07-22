import axios from "../api/axios";

// ======================
// GET ALL COURSES
// ======================
export const getAllCourses = async (search = "") => {
  const url =
    search && search.trim() !== ""
      ? `/courses?search=${encodeURIComponent(search)}`
      : "/courses";

  const response = await axios.get(url);
  return response.data;
};

// ======================
// GET COURSE BY ID
// ======================
export const getCourseById = async (id) => {
  const response = await axios.get(`/courses/${id}`);
  return response.data;
};

// ======================
// ENROLLED COURSES
// ======================
export const getEnrolledCourses = async () => {
  const response = await axios.get("/courses/enrolled");
  return response.data;
};

// ======================
// FAVORITE COURSES
// ======================
export const getFavoriteCourses = async () => {
  const response = await axios.get("/courses/favorites");
  return response.data;
};

// ======================
// RECENT COURSES
// ======================
export const getRecentCourses = async () => {
  const response = await axios.get("/courses/recent");
  return response.data;
};

// ======================
// CREATE COURSE
// ======================
export const createCourse = async (courseData) => {
  const response = await axios.post("/courses", courseData);
  return response.data;
};

// ======================
// UPDATE COURSE
// ======================
export const updateCourse = async (id, courseData) => {
  const response = await axios.put(`/courses/${id}`, courseData);
  return response.data;
};

// ======================
// DELETE COURSE
// ======================
export const deleteCourse = async (id) => {
  const response = await axios.delete(`/courses/${id}`);
  return response.data;
};

// ======================
// ENROLL COURSE
// ======================
export const enrollCourse = async (id) => {
  const response = await axios.post(`/courses/${id}/enroll`);
  return response.data;
};

// ======================
// TOGGLE FAVORITE
// ======================
export const favoriteCourse = async (id) => {
  const response = await axios.patch(`/courses/${id}/favorite`);
  return response.data;
};

// ======================
// UPDATE PROGRESS
// ======================
export const updateProgress = async (id, progress) => {
  const response = await axios.patch(
    `/courses/${id}/progress?progress=${progress}`
  );
  return response.data;
};