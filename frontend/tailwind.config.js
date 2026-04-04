/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050810',
        surf: '#0b1120',
        surf2: '#111a2e',
        bord: '#1a2a44',
        text: '#c8d8f0',
        dim: '#4a6a8a',
        accent: {
          green: '#00e5a0',
          green2: '#00b07a',
          blue: '#3b8aff',
          gold: '#f0b429',
        }
      },
      fontFamily: {
        mono: ['Space Mono', 'monospace'],
        sans: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'scanline': 'scanline 9s linear infinite',
        'grid-pulse': 'gridPulse 6s ease-in-out infinite',
        'fade-up': 'fadeUp .7s ease both',
      },
      keyframes: {
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,229,160,.15)' },
          '50%': { boxShadow: '0 0 44px rgba(0,229,160,.38)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '.5' },
          '50%': { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
