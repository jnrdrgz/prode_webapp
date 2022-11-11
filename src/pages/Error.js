import React  from 'react';

export default function Error({
  title,
  headline,
  button,
  ...rest
}) {

  return (
    <main className="bg-gray-200 w-full h-screen text-gray-600">
      <section>
        <div className="container mx-auto px-4 h-full">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-full lg:w-5/12 px-4 text-center">
              <h1 className="text-gray-800">{title}</h1>
              <p className="text-gray-800">{headline}</p>
              <button type="button" className="btn-gray" onClick={() => {}}>
                {button}
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}