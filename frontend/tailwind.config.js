/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ['./src/**/*.{js,jsx,ts,tsx}',
  'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  /* src folder, for example */],
  theme: {
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};