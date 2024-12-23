/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/*.templ"],
  theme: {
    extend: {
      maxHeight: {
        dvh: "100dvh", // Use the modern `dvh` unit for dynamic viewport height
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
