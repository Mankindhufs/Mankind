import { transform } from 'typescript';

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
        modalBackground: 'rgba(0, 0, 0, 0.55)',
      },
      keyframes: {
        showAlert: {
          '0%': {
            transform: 'translateX(-50%) translateY(0%)',
            opacity: 0.5,
          },
          '30%': {
            transform: 'translateX(-50%) translateY(10%)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateX(-50%) translateY(0%)',
            opacity: 1,
          },
        },
        hideAlert: {
          from: {
            transform: 'translateX(-50%) translateY(0%)',
            opacity: 1,
          },
          to: {
            transform: 'translateX(-50%) translateY(-50%)',
            opacity: 0,
          },
        },
      },
      animation: {
        showAlert: 'showAlert 1s forwards',
        hideAlert: 'hideAlert 1s forwards',
      },
    },
  },
  plugins: [],
};
