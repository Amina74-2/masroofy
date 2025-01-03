import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../styles/Form.css";

const AddTransaction = ({ addTransaction }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (parseFloat(amount) < 0) {
      alert("Amount cannot be negative.");
      return;
    }

    if (new Date(date) > new Date()) {
      alert("Date cannot exceed today's date.");
      return;
    }

    if (name && amount && date && category) {
      addTransaction({
        id: uuidv4(),
        type,
        name,
        amount: parseFloat(amount),
        date,
        category,
        notes: notes.trim() || null,
      });

      setName("");
      setAmount("");
      setDate("");
      setCategory("");
      setNotes("");
    }
  };

  const incomeCategories = ["Main Job", "Freelance", "Bonus", "Gift"];
  const expenseCategories = ["Rent", "Groceries", "Transportation", "Entertainment"];

  const categories = type === "Income" ? incomeCategories : expenseCategories;

  return (
    <div className="form-container">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <input
          type="text"
          placeholder="Transaction Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount (DZD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
          required
        />
        <input
          type="date"
          value={date}
          max={getCurrentDate()}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Add notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddTransaction;
