module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#810000",
          "secondary": "#630000",
          "accent": "#EEEBDD",
          "neutral": "#191D24",
          "base-100": "#1B1717",
          "info": "#78716c",
          "success": "#e7e5e4",
          "warning": "#f59e0b",
          "error": "#F87272",
        },
      },
    ],
  },
}

