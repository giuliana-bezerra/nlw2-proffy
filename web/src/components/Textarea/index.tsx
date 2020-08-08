import React, { TextareaHTMLAttributes } from 'react';

import './styles.css';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  onChangeCallback: Function;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  onChangeCallback,
  ...rest
}) => {
  return (
    <div className='textarea-block'>
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        onChange={(event) => onChangeCallback(event.target.value)}
        {...rest}
      />
    </div>
  );
};

export default Textarea;
