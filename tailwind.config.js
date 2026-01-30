/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#F1FDF6', 100: '#DEFAE9', 200: '#C0F4D6', 300: '#93EAB9',
          400: '#60D995', 500: '#05A446', 600: '#038237', 700: '#03672D',
          800: '#035226', 900: '#024321', 950: '#012513',
        },
        brand: { yellow: '#FFE94C', dark: '#012513', cream: '#FDFBF7' }
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      animation: {
        'marquee': 'marquee 120s linear infinite',
        'marquee-reverse': 'marquee-reverse 50s linear infinite',
        'spin-slow': 'spin 12s linear infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'marquee-reverse': { '0%': { transform: 'translateX(-50%)' }, '100%': { transform: 'translateX(0)' } }
      }
    }
  },
  plugins: [],
}