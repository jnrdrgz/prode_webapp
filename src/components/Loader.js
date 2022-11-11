import React from 'react';

export default function Loader({
  spinnerClassName,
  containerClassName,
  strokeWidth = 4,
  ...rest
}) {
  return (
    <div className={
      (rest.clean ? '' : (rest.size === 'full' ? "z-50 flex w-full h-screen fixed " : ( rest.size === 'mini' ? "z-50 flex p-0" : "z-50 flex w-full p-5 ")))
      + (containerClassName ? containerClassName : "")
    }>
      <span className="m-auto">
        <svg
          className={" animate-spin -ml-1 mr-3 " + (spinnerClassName ? spinnerClassName : "h-12 w-12 text-white")}
          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={strokeWidth}></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </span>
    </div>
  );
}



