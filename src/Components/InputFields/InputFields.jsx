import React from "react";
import { TextField, Button } from "@mui/material";

const InputFields = ({ Lable, Type, Required, maxLength, value, onChange }) => {
  return (
    <div className="inp">
      <TextField
        fullWidth
        label={Lable}
        value={value}
        onChange={onChange}
        type={Type}
        id="fullWidth"
        maxLength={maxLength}
        required={Required}
      />
    </div>
  );
};

export default InputFields;
