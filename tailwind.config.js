/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    maxWidth: {
      '1100': '1100px',
    },
    extend: {
      colors: {
        yellow: '#FFA742',
      },
    },
  },
  plugins: [
  ],
}
