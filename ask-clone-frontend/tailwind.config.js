/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: { 28: "28px" },
      colors: {
        accent: "#EB3D43",
        accentdark: "#BF3036",
      },
    },
  },
  plugins: [],
};
