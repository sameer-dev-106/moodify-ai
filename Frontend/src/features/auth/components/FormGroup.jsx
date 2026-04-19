import React from "react";
import "./style/formGroup.scss"

const FormGroup = ({ type, label, placeholder }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormGroup;
