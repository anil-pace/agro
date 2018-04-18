import React from 'react';

const Select = props => {
  return (
    <div className='form-group form-inline'>
      <label for={props.name}> {props.title} </label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.handleChange}
        className='form-control'
      >
        <option value='' disabled>
          {props.placeholder}
        </option>
        {props.options.map(option => {
          return (
            <option
              key={option.label}
              value={option.value}
              label={option.label}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
