/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: { 28: "28px", xxs: "8px" },
      colors: {
        accent: "#EB3D43",
        accentdark: "#BF3036",
        themeblack: "#090B0C",
      },
      minHeight: {
        6: "6rem",
      },
      width: {
        "2/3": "60%",
      },
    },
  },
  plugins: [],
};
