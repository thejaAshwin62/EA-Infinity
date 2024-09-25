import React from "react";

const FormRow = ({ name, defaultValue, labelText, type, onChange }) => {
  return (
    <div className="form-row" style={{ marginBottom: "1rem" }}>
      <label htmlFor={name} className="form-label" style={{ color: "white" }}>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="form-input"
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
        style={{
          color: "white",
          backgroundColor: "#333",
          border: "1px solid #555",
        }}
      />
    </div>
  );
};

export default FormRow;
