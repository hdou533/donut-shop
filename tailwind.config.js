/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./app/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e3545f",
        secondary: "#fdc2c6",
      },
    },
  },
  important: true,
  plugins: [],
};
