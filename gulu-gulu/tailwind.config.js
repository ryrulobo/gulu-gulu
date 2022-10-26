/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: { min: "320px", max: "424px" },
      xsm: { min: "425px", max: "639px" },
      sm: "640px",
      xmm: { min: "641px", max: "685px" },
      xml: { min: "685px", max: "767px" },
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};
