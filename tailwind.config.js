/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.{ejs,html}", "./src/**/*.{js,ts}"], // Đường dẫn tới tệp EJS và TypeScript
  theme: {
    extend: {
      colors: {
        primary: "#008060",
        hover_primary: "#33b893",
      },
    },
  },
  plugins: [],
};
