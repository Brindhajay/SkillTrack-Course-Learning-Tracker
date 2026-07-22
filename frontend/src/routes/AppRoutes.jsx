import { Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Explore from "../pages/Explore/Explore";
import CourseDetails from "../pages/CourseDetails/CourseDetails";
import MyLearning from "../pages/MyLearning/MyLearning";
import Favorites from "../pages/Favorites/Favorites";
import Profile from "../pages/Profile/Profile";
import CreateCourse from "../pages/CreateCourse/CreateCourse";

import MainLayout from "../layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/courses" element={<Explore />} />

        <Route path="/courses/:id" element={<CourseDetails />} />

        <Route path="/learning" element={<MyLearning />} />

        <Route path="/create-course" element={<CreateCourse />} />

        <Route path="/create-course/:id" element={<CreateCourse />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
