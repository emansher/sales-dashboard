const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dashboardData = [
  {
    month: "January",
    category: "Electronics",
    sales: 12000,
    orders: 120,
    customers: 85,
  },
  {
    month: "February",
    category: "Clothing",
    sales: 9500,
    orders: 95,
    customers: 70,
  },
  {
    month: "March",
    category: "Electronics",
    sales: 15000,
    orders: 145,
    customers: 110,
  },
  {
    month: "April",
    category: "Furniture",
    sales: 11000,
    orders: 100,
    customers: 75,
  },
  {
    month: "May",
    category: "Clothing",
    sales: 13500,
    orders: 130,
    customers: 95,
  },
  {
    month: "June",
    category: "Furniture",
    sales: 16000,
    orders: 150,
    customers: 120,
  },
];

app.get("/", (req, res) => {
  res.json({
    message: "Dashboard API is running.",
  });
});

app.get("/api/dashboard", (req, res) => {
  res.json(dashboardData);
});

app.listen(PORT, () => {
  console.log(`Dashboard API running on port ${PORT}`);
});
