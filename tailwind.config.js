/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: "Red Hat Text",
    },
    extend: {
      colors: {
        primary: "hsl(14, 86%, 42%)",
        secondary: "hsl(159, 69%, 38%)",
        rose: "hsl(20, 50%, 98%)",
        rose2: "hsl(13, 31%, 94%)",
        rose3: "hsl(14, 25%, 72%)",
        rose4: "hsl(7, 20%, 60%)",
        rose5: "hsl(12, 20%, 44%)",
        rose6: "hsl(14, 65%, 9%)",
      },
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "3rem" },
      },
    },
  },
  plugins: [],
};
