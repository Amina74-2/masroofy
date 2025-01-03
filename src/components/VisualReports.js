import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import "../styles/VisualReports.css";

const VisualReports = ({ transactions }) => {
  const incomeTransactions = transactions.filter((t) => t.type === "Income");
  const expenseTransactions = transactions.filter((t) => t.type === "Expense");

  const expenseData = expenseTransactions.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(expenseData),
    datasets: [
      {
        data: Object.values(expenseData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const monthlyData = transactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString("default", { month: "short" });
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.type === "Income") acc[month].income += t.amount;
    if (t.type === "Expense") acc[month].expense += t.amount;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Income",
        data: Object.values(monthlyData).map((d) => d.income),
        backgroundColor: "#4caf50",
      },
      {
        label: "Expenses",
        data: Object.values(monthlyData).map((d) => d.expense),
        backgroundColor: "#f44336",
      },
    ],
  };

  return (
    <div className="reports-container">
      <h1>Visual Reports</h1>
      <div className="chart-section">
        <h2>Category-wise Expense Distribution</h2>
        <div className="chart">
          <Pie data={pieChartData} />
        </div>
      </div>
      <div className="chart-section">
        <h2>Monthly Income vs Expenses</h2>
        <div className="chart">
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default VisualReports;
