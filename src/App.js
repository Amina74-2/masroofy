import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import AddTransaction from "./components/AddTransaction";
import ExportData from "./components/ExportData";
import VisualReports from "./components/VisualReports";
import TransactionList from "./components/TransactionList";
import "./styles/App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    recalculateTotals(updatedTransactions);
  };

  const recalculateTotals = (updatedTransactions) => {
    const income = updatedTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = updatedTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(income - expense);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={<Home transactions={transactions} totalIncome={totalIncome} />}
            />
            <Route
              path="/add-transaction"
              element={<AddTransaction addTransaction={addTransaction} />}
            />
            <Route
              path="/export-data"
              element={<ExportData transactions={transactions} />}
            />
            <Route
              path="/visual-reports"
              element={<VisualReports transactions={transactions} />}
            />
            <Route
              path="/transaction-list"
              element={
                <TransactionList
                  transactions={transactions}
                  setTransactions={(updatedTransactions) => {
                    setTransactions(updatedTransactions);
                    recalculateTotals(updatedTransactions);
                  }}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
