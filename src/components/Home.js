import React from "react";
import "../styles/Home.css";

const Home = ({ transactions, totalIncome }) => {
  const totalExpenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="home-container">
      <h1>Welcome to Masroofy</h1>
      <div className="summary">
        <div className="card">
          <h3>Total Income</h3>
          <p>{totalIncome.toFixed(2)} DZD</p>
        </div>
        <div className="card">
          <h3>Total Expenses</h3>
          <p>{totalExpenses.toFixed(2)} DZD</p>
        </div>
        <div className="card">
          <h3>Balance</h3>
          <p>{balance.toFixed(2)} DZD</p>
        </div>
      </div>

      <div className="transaction-list">
        <h2>Recent Transactions</h2>
        <ul>
          {transactions.map((t, index) => (
            <li key={index}>
              <span>{t.date}</span> / <strong>{t.name}</strong> ({t.category}) /{" "}
              {t.type === "Income" ? "+" : "-"}{Number(t.amount).toFixed(2)} DZD
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
