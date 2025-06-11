/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8ecdff',
          400: '#58b0ff',
          500: '#3691ff', // primary blue
          600: '#1e71f0',
          700: '#1659dd',
          800: '#1949b3',
          900: '#1a3f8c',
        },
        secondary: {
          50: '#effef8',
          100: '#dafeef',
          200: '#b8f8e0',
          300: '#81eed0',
          400: '#42dcb7',
          500: '#1dc19e', // secondary green
          600: '#0e9b81',
          700: '#107c6a',
          800: '#126255',
          900: '#125048',
        },
        accent: {
          50: '#fef8ee',
          100: '#fdefd7',
          200: '#fadcae',
          300: '#f7c47b',
          400: '#f39f46',
          500: '#f0802a', // accent orange
          600: '#e65c19',
          700: '#c03e15',
          800: '#9a3219',
          900: '#7b2b18',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Manrope', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};