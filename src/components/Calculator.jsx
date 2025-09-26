import React, { useEffect, useState } from "react";

function Calculator() {
  const [rows, setRows] = useState([]);

  const [sum, setSum] = useState(0);

  const updateSum = () => {
    setSum(
      rows.length != 0
        ? rows.reduce(
            (prev, curr) =>
              curr.disabled ? prev : prev + curr.sign * curr.value,
            0
          )
        : 0
    );
  };

  useEffect(() => updateSum(), [rows]);

  const onChangeRow = (newRow) => {
    setRows(rows.map((r) => (r.id == newRow.id ? { ...r, ...newRow } : r)));
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-dark"
        aria-label="Add row button"
        onClick={() => setRows([...rows, createRow()])}
      >
        Add row
      </button>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <CalculatorRow row={row} onChangeRow={onChangeRow} />
          </li>
        ))}
      </ul>
      <h5>Result:{sum}</h5>
    </>
  );
}

function createRow() {
  return {
    id: Date.now(),
    value: 0,
    sign: 1,
    disabled: false,
  };
}

function CalculatorRow({ row, onChangeRow }) {
  const handleChange = (event) => {
    const value = Number(event.target.value) || 0;
    onChangeRow({ ...row, value });
  };

  const handleSignChange = (event) => {
    const sign = event.target.value === "+" ? 1 : -1;
    onChangeRow({ ...row, sign });
  };

  return (
    <div className="input-group mb-3">
      <select
        className="form-select form-select-lg mb-3"
        aria-label="Select sign"
        value={row.sign === 1 ? "+" : "-"}
        onChange={handleSignChange}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        //dobbiamo mettere qualche constraint perché siano inseribili solo numeri
        type="text"
        aria-label="Insert number"
        value={row.value}
        onChange={handleChange}
      />
      <button
        type="button"
        className="btn btn-outline-dark"
        aria-label="Delete button"
      >
        Delete
      </button>
      <button
        type="button"
        className="btn btn-outline-dark"
        aria-label="Disable button"
      >
        Disable
      </button>
    </div>
  );
}

export default Calculator;
