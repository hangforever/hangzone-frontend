import React, { useState } from 'react'

interface FieldProps {
  label: string
  initialValue: string
  onSubmit: (value: string) => void
}

const Field: React.SFC<FieldProps> = ({
  label,
  initialValue,
  onSubmit,
}) => {
  const [value, updateValue] = useState(initialValue)
  const [active, updateActive] = useState(false)
  return (
    <div className="Field">
      <label htmlFor={label}>{label}</label>
      {active ? (
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(value)
          updateActive(false)
        }}>
          <input type="text" name={label} value={value} onChange={(e) => updateValue(e.target.value)} />
        </form>
      ) : (
          <div className="field-value" onClick={() => updateActive(true)}>{value}</div>
        )}
    </div>
  )
}

export default Field