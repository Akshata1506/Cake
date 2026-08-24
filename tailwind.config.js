/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Black + White + Raspberry Pink Palette ── */
        'bg-color':     '#ffffff',   /* Pure White Background */
        'primary-dark': '#000000',   /* Pure Black */
        'accent-gold':  '#e55b75',   /* Raspberry Pink */
        'card-bg':      '#111111',   /* Off-Black Card Background */
        'text-light':   '#ffffff',   /* White Text */
        'text-muted':   '#a0a0a0',   /* Light Muted Gray */

        /* Tailwind semantic aliases mapped for backwards compatibility */
        'cream-base': '#ffffff',
        cream: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#f5f5f5',
        },
        chocolate: {
          light: '#333333',
          medium: '#222222',
          DEFAULT: '#000000',
          dark: '#111111',
        },
        gold: {
          light: '#fff0f2',
          DEFAULT: '#e55b75',
          dark: '#c03d55',
        },
        rose: {
          light: '#fff0f2',
          DEFAULT: '#e55b75',
          dark: '#c03d55',
        },
        /* AllCakes page section backgrounds */
        'purple-lightest': '#ffffff',
        'purple-lighter':  '#f9f9f9',
        'purple-light':    '#ffffff',
        'purple-medium':   '#f9f9f9',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium':       '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
        'premium-hover': '0 20px 50px -15px rgba(0, 0, 0, 0.15)',
        'gold-glow':     '0 0 30px rgba(229, 91, 117, 0.35)',
        'glass':         '0 8px 32px 0 rgba(0, 0, 0, 0.04)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
