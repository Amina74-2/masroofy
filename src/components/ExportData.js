import React from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../styles/ExportData.css";

const ExportData = ({ transactions }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "transactions.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions", 20, 10);

    const tableData = transactions.map((t) => [
      t.name,
      t.type,
      t.category,
      t.amount.toFixed(2),
      t.date,
    ]);

    doc.autoTable({
      head: [["Name", "Type", "Category", "Amount (DZD)", "Date"]],
      body: tableData,
    });

    doc.save("transactions.pdf");
  };

  return (
    <div className="export-container">
      <h2>Export Your Data</h2>
      <div className="export-buttons">
        <button onClick={exportToExcel}>Export to Excel</button>
        <button onClick={exportToPDF}>Export to PDF</button>
      </div>
    </div>
  );
};

export default ExportData;
