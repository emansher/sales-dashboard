import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const COLORS = ["#8b5cf6", "#06b6d4", "#22c55e", "#f59e0b"];

// Use Railway API in production and localhost during development
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

function App() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/dashboard`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not fetch dashboard data");
        }

        return response.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "Backend is not running. Start the server and refresh."
        );
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(data.map((item) => item.category))],
    [data]
  );

  const filteredData = useMemo(() => {
    if (category === "All") {
      return data;
    }

    return data.filter((item) => item.category === category);
  }, [data, category]);

  const totalSales = filteredData.reduce(
    (sum, item) => sum + item.sales,
    0
  );

  const totalOrders = filteredData.reduce(
    (sum, item) => sum + item.orders,
    0
  );

  const totalCustomers = filteredData.reduce(
    (sum, item) => sum + item.customers,
    0
  );

  const averageSales =
    filteredData.length > 0
      ? Math.round(totalSales / filteredData.length)
      : 0;

  const pieData = filteredData.map((item) => ({
    name: `${item.month} - ${item.category}`,
    value: item.sales,
  }));

  if (loading) {
    return (
      <div
        className="loading-screen"
        role="status"
        aria-live="polite"
      >
        <div className="spinner" aria-hidden="true"></div>
        <h2>Loading Dashboard...</h2>
        <p>Fetching data from the backend</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen" role="alert">
        <h1>Dashboard</h1>

        <div className="error-box">
          <h2>⚠️ Unable to load data</h2>

          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="dashboard">
      <header className="header">
        <div>
          <p className="eyebrow">FULL STACK WEB DEVELOPMENT</p>

          <h1>Sales Dashboard</h1>

          <p className="subtitle">
            Business performance powered by real backend data.
          </p>
        </div>

        <div className="filter-box">
          <label htmlFor="category">
            Filter by Category
          </label>

          <select
            id="category"
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            aria-label="Filter sales data by category"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </header>

      <section
        className="stats-grid"
        aria-label="Sales statistics"
      >
        <div className="stat-card">
          <span>Total Sales</span>

          <strong>
            ${totalSales.toLocaleString()}
          </strong>

          <small>Selected data</small>
        </div>

        <div className="stat-card">
          <span>Total Orders</span>

          <strong>
            {totalOrders.toLocaleString()}
          </strong>

          <small>Completed orders</small>
        </div>

        <div className="stat-card">
          <span>Total Customers</span>

          <strong>
            {totalCustomers.toLocaleString()}
          </strong>

          <small>Customers reached</small>
        </div>

        <div className="stat-card">
          <span>Average Sales</span>

          <strong>
            ${averageSales.toLocaleString()}
          </strong>

          <small>Per data point</small>
        </div>
      </section>

      <section
        className="charts-grid"
        aria-label="Sales charts"
      >
        <div
          className="chart-card"
          role="region"
          aria-labelledby="sales-category-title"
        >
          <div className="chart-heading">
            <h2 id="sales-category-title">
              Sales by Category
            </h2>

            <span>Bar Chart</span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="category" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="sales"
                name="Sales"
                fill="#8b5cf6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className="chart-card"
          role="region"
          aria-labelledby="monthly-sales-title"
        >
          <div className="chart-heading">
            <h2 id="monthly-sales-title">
              Monthly Sales Trend
            </h2>

            <span>Line Chart</span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="sales"
                name="Sales"
                stroke="#06b6d4"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className="chart-card full-width"
          role="region"
          aria-labelledby="sales-distribution-title"
        >
          <div className="chart-heading">
            <h2 id="sales-distribution-title">
              Sales Distribution
            </h2>

            <span>Pie Chart</span>
          </div>

          <ResponsiveContainer
            width="100%"
            height={360}
          >
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
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      <footer>
        <p>React • Express • Recharts</p>
      </footer>
    </main>
  );
}

export default App;