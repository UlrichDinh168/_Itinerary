/** @format */

import React from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";

const Input = ({
  label,
  onChange,
  placeholder,
  name,
  reference,
  focus,
  id,
  onFocus,
  value,
  onBlur,
  handleClickInputIcon,
}) => {
  return (
    <div className='input__wrapper' >
      <TextField
        type='text'
        label={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        size='small'
        inputRef={reference}
        id={id}
        sx={{ m: 1, width: "39.5ch" }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {!focus && (
        <div className='input__wrapper--clear' onClick={handleClickInputIcon}>
          <ClearIcon />
        </div>
      )}
    </div>
  );
};

export default Input;
