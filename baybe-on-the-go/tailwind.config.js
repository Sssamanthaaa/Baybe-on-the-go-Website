/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        scan: {
          '0%, 100%': { top: '0%' },
          '50%': { top: '100%' }
        }
      },
      animation: {
        'scan': 'scan 2s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
