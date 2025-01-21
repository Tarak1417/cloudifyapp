import React, { useState } from "react";

import "./App.css";
import TableRow from "./components/TableRow";

const App = () => {
  const [rows, setRows] = useState([{ id: 1 }]);

  const addNewRow = () => {
    setRows([...rows, { id: rows.length + 1 }]);
  };

  return (
    <div className="app">
      <table>
        <thead>
          <tr>
            <th>Label 1</th>
            <th>Label 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <TableRow key={row.id} rowIndex={index} />
          ))}
        </tbody>
      </table>
      <button className="add-row-btn" onClick={addNewRow}>
        + Add New Row
      </button>
    </div>
  );
};

export default App;
