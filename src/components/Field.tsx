import React, { useState } from 'react';
import './Field.scss';

interface FieldProps {
  label: string;
  initialValue?: string;
  initialActive?: boolean;
  onSubmit?: (value: string) => void;
  disabled?: boolean;
}

const Field: React.SFC<FieldProps> = ({
  label,
  initialValue = '',
  initialActive = false,
  onSubmit = () => {},
  disabled = false,
}) => {
  const [value, updateValue] = useState(initialValue);
  const [active, updateActive] = useState(initialActive);
  return (
    <div className="Field">
      <label className="Field__label" htmlFor={label}>
        {label}
      </label>
      {active ? (
        <form
          className="Field__form"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(value);
            updateActive(false);
          }}
        >
          <input
            className="Field__input"
            type="text"
            name={label}
            value={value}
            onChange={(e) => updateValue(e.target.value)}
          />
        </form>
      ) : (
        <div
          className="Field__value"
          onClick={disabled ? () => {} : () => updateActive(true)}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default Field;
