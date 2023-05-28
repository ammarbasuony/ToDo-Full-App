/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#234567",
      },
      fontFamily: {
        primary: ["Poppins"],
      },
    },
  },
  plugins: [],
};
