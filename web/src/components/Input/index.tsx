import React, { InputHTMLAttributes } from 'react';

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  onChangeCallback?: Function;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  onChangeCallback,
  ...rest
}) => {
  return (
    <div className='input-block'>
      <label htmlFor={name}>{label}</label>
      <input
        type='text'
        id={name}
        onChange={(event) => {
          onChangeCallback && onChangeCallback(event.target.value);
        }}
        {...rest}
      />
    </div>
  );
};

export default Input;
