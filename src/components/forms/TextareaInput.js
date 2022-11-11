import React from 'react';

const TextareaInput = ({ input, meta, label, ...rest }) => {
  return (
    <div className={"form-control " + (rest.className ? rest.className : "")}>
      {label && (
        <label htmlFor={input.name} className={"label " + (rest.labelClassName ? rest.labelClassName : "")}>
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        {...input}
        className={"textarea textarea "
          + (meta && meta.error && meta.touched ? "is-invalid invalid-shadow" : "")
          + (rest.inputClassName ? rest.inputClassName : "h-24 input-bordered")
        }
        placeholder={rest.placeholder}
        disabled={rest.disabled}
        readOnly={rest.readOnly}
        data-gramm="false"
      ></textarea>
      {!rest.noError && (
        <label className="label">
          <span className="label-text-alt invalid-feedback">{meta && meta.touched && meta.error}</span>
        </label>
      )}
    </div>
  )
}

export default TextareaInput;