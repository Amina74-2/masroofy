import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlus, FaChartPie, FaList, FaFileExport } from "react-icons/fa";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Masroofy</h2>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaHome /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-transaction" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaPlus /> Add Transaction
          </NavLink>
        </li>
        <li>
          <NavLink to="/visual-reports" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaChartPie /> Visual Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/transaction-list" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaList /> Transaction List
          </NavLink>
        </li>
        <li>
          <NavLink to="/export-data" className={({ isActive }) => (isActive ? "active" : "")}>
            <FaFileExport /> Export Data
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
