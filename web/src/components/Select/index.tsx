import React, { SelectHTMLAttributes } from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChangeCallback?: Function;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  onChangeCallback,
  ...rest
}) => {
  return (
    <div className='select-block'>
      <label htmlFor={name}>{label}</label>
      <select
        value=''
        id={name}
        onChange={(event) => {
          onChangeCallback && onChangeCallback(event.target.value);
        }}
        {...rest}
      >
        <option value='' disabled hidden>
          Selecione uma opção
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </select>
    </div>
  );
};

export default Select;
