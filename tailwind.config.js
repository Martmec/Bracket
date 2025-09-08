/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B1B2B',
          navy2: '#0E2338',
          panel: '#0F2134',
          border: '#1E2C3E',
          purple: '#5A1FBF',
          purple2: '#7B2DCC',
          highlight: '#8F7CFF',
          green: '#21D07A',
        },
      },
    },
  },
  plugins: [],
}


