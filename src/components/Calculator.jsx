import React, { useState } from "react";

import { Row, Col } from "react-bootstrap";

function Calculator() {
  const [rows, setRows] = useState([]);

  const sum = rows.reduce(
    (prev, curr) => (curr.disabled ? prev : prev + curr.sign * curr.value),
    0
  );
  const onChangeRow = (newRow) => {
    setRows(rows.map((r) => (r.id == newRow.id ? { ...r, ...newRow } : r)));
  };

  const onDelete = (id) => setRows(rows.filter((row) => row.id != id));

  return (
    <>
      <Row className="mb-3">
        <Col className="align-self-center">
          <button
            type="button"
            className="btn btn-primary px-5"
            aria-label="Add row button"
            onClick={() => setRows([...rows, createRow()])}
          >
            Add row
          </button>
        </Col>
      </Row>
      {rows.length != 0 && (
        <Row id="calculator-rows">
          {rows.map((row) => (
            <CalculatorRow
              key={row.id}
              row={row}
              onChangeRow={onChangeRow}
              onDelete={onDelete}
            />
          ))}
        </Row>
      )}
      <Row>
        <h5>Result:{sum}</h5>
      </Row>
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

function CalculatorRow({ row, onChangeRow, onDelete }) {
  const handleInputChange = (event) => {
    const value = Number(event.target.value) || 0;
    onChangeRow({ ...row, value });
  };

  const handleSignChange = (event) => {
    const sign = event.target.value === "+" ? 1 : -1;
    onChangeRow({ ...row, sign });
  };

  const handleDisable = () => {
    onChangeRow({ ...row, disabled: !row.disabled });
  };

  const handleDelete = () => onDelete(row.id);

  return (
    <Row className="input-group   ">
      <Col xs={1} md={2}>
        <select
          className="form-select form-select-lg mb-3 form-element"
          aria-label="Select sign"
          value={row.sign === 1 ? "+" : "-"}
          onChange={handleSignChange}
          disabled={row.disabled}
        >
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
      </Col>
      <Col xs={3} md={6} className="form-col ">
        <input
          type="text"
          className="form-element"
          aria-label="Insert number"
          value={row.value}
          onChange={handleInputChange}
          disabled={row.disabled}
        />
      </Col>
      <Col xs={2} md={2} className=" form-col">
        <button
          type="button"
          className="btn btn-danger form-element "
          aria-label="Delete button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </Col>
      <Col xs={2} md={2} className="form-col ">
        <button
          type="button"
          className="btn btn-secondary form-element"
          aria-label="Disable button"
          onClick={handleDisable}
        >
          {row.disabled ? "Enable" : "Disable"}
        </button>
      </Col>
    </Row>
  );
}

export default Calculator;
