import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { FaBookOpen, FaFire, FaCheckCircle, FaChartLine } from "react-icons/fa";

import StatCard from "../../components/dashboard/StatCard/StatCard";
import ProgressChart from "../../components/dashboard/ProgressChart/ProgressChart";
import ContinueLearning from "../../components/dashboard/ContinueLearning/ContinueLearning";
import RecentCourses from "../../components/dashboard/RecentCourses/RecentCourses";

import { getDashboardData } from "../../services/dashboardService";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    totalCourses: 0,
    enrolledCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    plannedCourses: 0,
    favoriteCourses: 0,
    beginnerCourses: 0,
    intermediateCourses: 0,
    advancedCourses: 0,
    averageProgress: 0,
    courseProgress: [],
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardData();

        setDashboardData(data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard">
      {/* =========================
                Statistics Cards
            ========================== */}

      <div className="stats-grid">
        <div className="clickable-card" onClick={() => navigate("/courses")}>
          <StatCard
            title="Total Courses"
            value={dashboardData.totalCourses}
            icon={<FaBookOpen />}
            color="#4F46E5"
          />
        </div>

        <div
          className="clickable-card"
          onClick={() => navigate("/learning?status=IN_PROGRESS")}
        >
          <StatCard
            title="In Progress"
            value={dashboardData.inProgressCourses}
            icon={<FaFire />}
            color="#F59E0B"
          />
        </div>

        <div
          className="clickable-card"
          onClick={() => navigate("/learning?status=COMPLETED")}
        >
          <StatCard
            title="Completed"
            value={dashboardData.completedCourses}
            icon={<FaCheckCircle />}
            color="#22C55E"
          />
        </div>

        <div
          className="clickable-card"
          onClick={() => {
            document.querySelector(".dashboard-chart")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <StatCard
            title="Average Progress"
            value={`${dashboardData.averageProgress}%`}
            icon={<FaChartLine />}
            color="#EC4899"
          />
        </div>
      </div>

      {/* =========================
                Recent Courses & Continue Learning
            ========================== */}

      <div className="dashboard-content">
        <RecentCourses />

        <ContinueLearning />
      </div>

      {/* =========================
                Course Progress Analytics
            ========================== */}

      <div className="dashboard-chart">
        <ProgressChart dashboardData={dashboardData} />
      </div>
    </div>
  );
}

export default Dashboard;
