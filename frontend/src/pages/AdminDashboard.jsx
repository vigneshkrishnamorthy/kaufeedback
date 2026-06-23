import { useEffect, useState } from "react";
import "./AdminDashboard.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

import {
  getDashboard,
  getEntries,
  getRatingStats
} from "../services/api";

export default function AdminDashboard() {

  const [dashboard, setDashboard] = useState(null);
  const [entries, setEntries] = useState([]);
  const [ratingStats, setRatingStats] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {

    try {

      const dashboardData =
        await getDashboard();

      const entriesData =
        await getEntries();

      const ratingData =
        await getRatingStats();

      setDashboard(dashboardData);
      setEntries(entriesData);
      setRatingStats(ratingData);

    } catch (error) {

      console.error(
        "Dashboard Load Error",
        error
      );
    }
  };

  useEffect(() => {

    loadData();

    const interval =
      setInterval(() => {

        loadData();

      }, 30000);

    return () =>
      clearInterval(interval);

  }, []);

  const filteredEntries =
    entries.filter((entry) =>
      entry.patientName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const COLORS = [
    "#9C1F6A",
    "#C2185B",
    "#F5A623",
    "#6D1B4F",
    "#D81B60"
  ];

  const pieData =
    ratingStats.map((item) => ({
      name: `${item.rating} Star`,
      value: item.count
    }));

  if (!dashboard) {

    return (
      <div className="admin-loading">
        Loading Dashboard...
      </div>
    );
  }

  return (

    <div className="admin-container">

      {/* Header */}

      <div className="admin-header">

        <div className="header-left">

          <img
            src="/kauvery-logo.png"
            alt="Kauvery Hospital"
            className="hospital-logo"
          />

          <div className="header-text">

            <h1>
              Patient Experience Dashboard
            </h1>

            <p>
              Kauvery Hospital Feedback Analytics System
            </p>

          </div>

        </div>

        <div className="header-right">

          <button
            className="export-btn"
            onClick={() =>
              window.open(
                "https://kaufeedback.exploremira.com/api/admin/export"
              )
            }
          >
            📥 Export CSV
          </button>

        </div>

      </div>

      {/* Stats */}

      <div className="stats-grid">

        <div className="stat-card">

          <h3>
            Total Feedback Today
          </h3>

          <h2>
            {dashboard.totalFeedbackToday}
          </h2>

        </div>

        <div className="stat-card">

          <h3>
            Average Rating
          </h3>

          <h2>
            {Number(
              dashboard.averageRating
            ).toFixed(1)}
            ⭐
          </h2>

        </div>

      </div>

      {/* Department Wise Rating */}

      <div className="table-card">

        <h2>
          Department Wise Average Rating
        </h2>

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>Department</th>
                <th>Average Rating</th>
              </tr>

            </thead>

            <tbody>

              {dashboard.departmentRatings?.map(
                (dept, index) => (

                  <tr key={index}>

                    <td>
                      {dept.departmentName}
                    </td>

                    <td>
                      ⭐ {Number(
                        dept.averageRating
                      ).toFixed(1)}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* Rating Distribution */}

      <div className="table-card">

        <h2>
          Rating Distribution
        </h2>

        <div
          style={{
            width: "100%",
            height: "350px"
          }}
        >

          <ResponsiveContainer>

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >

                {pieData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip />
              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Feedback */}

      <div className="table-card">

        <div className="table-header">

          <h2>
            Recent Feedback
          </h2>

        </div>

        <input
          type="text"
          placeholder="Search Patient..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="search-box"
        />

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Age</th>
                <th>Visit Type</th>
                <th>Rating</th>
                <th>Comments</th>
                <th>Date</th>
              </tr>

            </thead>

            <tbody>

              {filteredEntries.map(
                (entry) => (

                  <tr key={entry.id}>

                    <td>{entry.id}</td>

                    <td>{entry.patientName}</td>

                    <td>{entry.age}</td>

                    <td>{entry.visitType}</td>

                    <td>
                      ⭐ {entry.rating}
                    </td>

                    <td>{entry.comments}</td>

                    <td>
                      {
                        new Date(
                          entry.createdAt
                        ).toLocaleDateString()
                      }
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );
}