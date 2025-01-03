import React, { useState } from "react";
import "../styles/TransactionList.css";
import "../styles/Form.css";

const TransactionList = ({ transactions, setTransactions }) => {
  const [filterDate, setFilterDate] = useState("");
  const [editTransactionId, setEditTransactionId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    amount: "",
    date: "",
    type: "Income",
    category: "",
  });

  const incomeCategories = ["Main Job", "Freelance", "Bonus", "Gift"];
  const expenseCategories = ["Rent", "Groceries", "Transportation", "Entertainment"];

  const handleFilterDateChange = (e) => setFilterDate(e.target.value);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (transaction) => {
    setEditTransactionId(transaction.id);
    setEditData({
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      category: transaction.category,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    const updatedAmount = parseFloat(editData.amount);
    if (isNaN(updatedAmount) || updatedAmount < 0) {
      alert("Amount must be a valid positive number.");
      return;
    }

    if (new Date(editData.date) > new Date()) {
      alert("Date cannot exceed today.");
      return;
    }

    const updatedTransactions = transactions.map((t) =>
      t.id === editTransactionId ? { ...t, ...editData, amount: updatedAmount } : t
    );

    setTransactions(updatedTransactions);
    setEditTransactionId(null);
    setEditData({ name: "", amount: "", date: "", type: "Income", category: "" });
  };

  const cancelEdit = () => {
    setEditTransactionId(null);
    setEditData({ name: "", amount: "", date: "", type: "Income", category: "" });
  };

  const applyFilters = (date) => {
    return transactions
      .filter((t) => (date ? t.date === date : true))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <div className="transaction-list-container">
      <h1>Transaction List</h1>

      <div className="filters">
        <input
          type="date"
          value={filterDate}
          onChange={handleFilterDateChange}
        />
      </div>

      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Type</th>
              <th>Category</th>
              <th>Amount (DZD)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applyFilters(filterDate).map((transaction) =>
              editTransactionId === transaction.id ? (
                <tr key={transaction.id}>
                  <td colSpan="6">
                    <form className="form-container">
                      <input
                        type="date"
                        name="date"
                        value={editData.date}
                        onChange={handleEditChange}
                        max={new Date().toISOString().split("T")[0]}
                      />
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                        placeholder="Name"
                      />
                      <input
                        type="number"
                        name="amount"
                        value={editData.amount}
                        onChange={handleEditChange}
                        placeholder="Amount"
                        min="0"
                      />
                      <select
                        name="type"
                        value={editData.type}
                        onChange={handleEditChange}
                      >
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
                      </select>
                      <select
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {(editData.type === "Income" ? incomeCategories : expenseCategories).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div>
                        <button
                          type="button"
                          onClick={saveEdit}
                          className="save-btn"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </td>
                </tr>
              ) : (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{Number(transaction.amount).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
