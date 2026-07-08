/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#161614',
          50: '#f6f6f5',
          100: '#e7e7e5',
          800: '#26251f',
          900: '#161614',
          950: '#0d0d0b',
        },
        cream: {
          DEFAULT: '#F5F1EA',
          50: '#faf8f4',
          100: '#F5F1EA',
          200: '#e9e1d3',
          300: '#d8ccb6',
        },
        gold: {
          DEFAULT: '#B8935A',
          light: '#cbab77',
          dark: '#9a7a48',
          50: '#f7f2e9',
          100: '#ebddc4',
        },
        sage: {
          DEFAULT: '#7C8471',
          dark: '#5c6353',
          light: '#9ba392',
        },
        navy: {
          DEFAULT: '#1F2A38',
          light: '#33445a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        luxe: '0.35em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.6, 0.01, 0.05, 0.95)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.15)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 1s ease forwards',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        kenburns: 'kenburns 20s ease-out forwards',
      },
    },
  },
  plugins: [],
}
