/** @format */

import React, { Ref } from "react";
import TextField from "@mui/material/TextField";
import ClearIcon from "@mui/icons-material/Clear";

type Props = {
  label: string,
  placeholder: string,
  name: string,
  focus: string,
  reference: Ref<any> | undefined,
  id: string,
  onFocus: () => void,
  onBlur: () => void,
  onChange: () => void,
  value: string,
  handleClickInputIcon: string,
}

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
}: Props) => {
  return (
    <div className='input__wrapper' ref={reference[1]}>
      <TextField
        type='text'
        label={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        size='small'
        inputRef={reference[0]}
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
