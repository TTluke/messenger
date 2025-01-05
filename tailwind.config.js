/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/*.templ"],
  theme: {
    extend: {
      maxHeight: {
        dvh: "100dvh", // Use the modern `dvh` unit for dynamic viewport height
      },
      outlineWidth: {
        3: "3px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require('@tailwindcss/container-queries'),
  ],
};
