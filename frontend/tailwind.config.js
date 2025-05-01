/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mainGreen: '#34C759',
        red: '#FF3B30',
        grayBorder: '#CBCBCB',
        grayIcon: '#969696',
        grayBackground: '#F4F4F4',
      },
    },
  },
  plugins: [],
};
