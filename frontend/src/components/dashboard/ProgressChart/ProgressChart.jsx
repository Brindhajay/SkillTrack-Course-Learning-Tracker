import "./ProgressChart.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { PieChart, Pie, Cell, Legend } from "recharts";

const COLORS = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#8B5CF6",
  "#EF4444",
  "#14B8A6",
];

function ProgressChart({ dashboardData }) {
  const courseProgress = dashboardData.courseProgress || [];

  if (courseProgress.length === 0) {
    return (
      <div className="progress-card">
        <h3>Course Progress Analytics</h3>

        <p className="no-data">No course progress available.</p>
      </div>
    );
  }

  const data = courseProgress
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  const allCourses = [...dashboardData.courseProgress].sort(
    (a, b) => b.progress - a.progress,
  );

  return (
    <div className="progress-card">
      <h3>Learning Progress Overview</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div style={{ width: "55%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={allCourses}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis type="number" domain={[0, 100]} />

              <YAxis type="category" dataKey="title" width={120} />

              <Tooltip formatter={(value) => `${value}%`} />

              <Bar dataKey="progress" fill="#4F46E5" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ width: "45%", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="progress"
                nameKey="title"
                cx="35%"
                cy="50%"
                outerRadius={80}
                innerRadius={50}
                paddingAngle={3}
                label={({ value }) => `${value}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>

              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;
