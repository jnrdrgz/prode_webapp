import React from 'react';

const TextInput = ({ input, meta, label, ...rest }) => {
  return (
    <div className={"form-control " + (rest.className ? rest.className : "")}>
      {label && (
        <label htmlFor={input.name} className={"label " + (rest.labelClassName ? rest.labelClassName : "")}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <input {...input}
        className={"input w-full " 
          + (meta && meta.error && meta.touched ? "input-error invalid-shadow " : "") 
          + (rest.inputClassName ? rest.inputClassName : "input-bordered")
        }
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
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

export default TextInput;