/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Menyertakan semua file dalam folder src
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 8s linear infinite',
      },
      fontFamily: {
        tungsten: ['"Tungsten"', 'sans-serif'],
        din: ['"DIN Next"', 'sans-serif'],
        ffmark: ['"FF Mark"', 'sans-serif'],
        proximanova: ['"Proxima Nova"', 'sans-serif'],
        arial: ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

