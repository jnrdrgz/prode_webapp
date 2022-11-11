import React from 'react';

export default function Button({ ...rest }) {
  return (
    <button
      type="button"
      className={"inline-flex items-center justify-center btn " + (rest.className ? rest.className : " btn-sm btn-gray") + ((rest.submitted || rest.disabled) ? " disabled" : "")}
      onClick={() => rest.onClick && rest.onClick(rest.value)}
      disabled={rest.disabled}
    >
      {/*{rest.icon && <Icon className={"-ml-1 h-4 w-4" + (rest.title ? " mr-2" : "")} name={rest.icon} />}*/}
      {rest.title}
    </button>
  )
}