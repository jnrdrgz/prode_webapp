import React from 'react';

const NumberInput = ({ input, meta, label, ...rest }) => {
  return (
    <div className={"form-control " + (rest.className ? rest.className : "")}>
      <input {...input}
        type="text"
        className={"input input-sm max-w-xs w-full " 
          + (meta && meta.error && meta.touched ? "input-error invalid-shadow " : "") 
          + (rest.inputClassName ? rest.inputClassName : "input-bordered")
        }
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
        maxLength={1}
      />
      {!rest.noError && (
        <label className="label">
          <span className="label-text-alt invalid-feedback">{""}</span>
        </label>
      )}

      {meta.data.warning && (
        <label className="label">
          <span className="label-text-alt text-warning">{""}</span>
        </label>
      )}
    </div>
  )
}

export default NumberInput;