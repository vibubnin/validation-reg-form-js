import classNames from 'classnames';
import React from 'react';
import './InputField.css';

export const InputField = ({
  type = 'text',
  name,
  value,
  placeholder = '',
  isDirty = false,
  errorText = '',
  onChange,
  onBlur
}) => {
  const isErrorVisible = errorText.length > 0 && isDirty;

  return (
    <div className="inputField">
      <input
        className={classNames('input', { invalidInput: isErrorVisible })}
        autoComplete="off"
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      { isErrorVisible && 
        <div className="invalidInputMessage">{errorText}</div> 
      }
    </div>
  )
}
