/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // your files
  theme: {
    extend: {
      colors:{
        bgBlue:"#005BAB",
        background:"#0B0B0B",
        secondaryBackground:"#060606"
      }
    },
  },
  plugins: [
    
    function ({ addVariant }) {
      addVariant('theme-light', '.theme-light &');
      addVariant('theme-dark', '.theme-dark &');
      
    },
  ]
}
