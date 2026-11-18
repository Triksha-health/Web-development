/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Triksha brand palette (redesign handoff) ──────────────────
        // Ink (primary text)
        ink: {
          DEFAULT: '#17191C',
          50:  '#F0F0F1',
          100: '#E1E1E3',
          200: '#C5C6C9',
          300: '#A1A3A6',
          400: '#7A7C80',
          500: '#56585C',
          600: '#3D4045',
          700: '#2A2D31',
          800: '#1F2126',
          900: '#17191C',
          950: '#0D1014',
        },
        body:  '#4F4B44', // paragraph text
        muted: '#6B665C', // captions, small labels

        // Cream ground + raised surfaces
        canvas: {
          DEFAULT: '#F4EEE1', // ground
          soft:    '#E9E0CD', // image wells
          paper:   '#FBF8F1', // raised surfaces
          warm:    '#FBF8F1', // alias
        },
        cream: '#F3EEE3', // text on navy
        line: {
          DEFAULT: '#E2D9C6',
          strong:  '#D8CDB6',
        },

        // Accent blue: 500 = buttons + highlighted words, 600 = small labels
        accent: {
          50:  '#EEF4FB',
          100: '#E4ECF6',
          200: '#C3D8F1',
          300: '#8EBDF2',
          400: '#4E93DE',
          500: '#1B6BC9',
          600: '#1557A8',
          700: '#104586',
          800: '#0C3566',
          900: '#0C2547',
          sky: '#8EBDF2', // on-navy light blue
        },

        // Alias kept for legacy `primary-*` usage on older pages
        primary: {
          50:  '#EEF4FB',
          100: '#E4ECF6',
          200: '#C3D8F1',
          300: '#8EBDF2',
          400: '#4E93DE',
          500: '#1B6BC9',
          600: '#1557A8',
          700: '#104586',
          800: '#0C3566',
          900: '#0C2547',
        },

        // Navy (clinician section, footer)
        navy: {
          DEFAULT: '#0C2547',
          50:  '#E6EBF2',
          100: '#C6CFDC', // body text on navy
          200: '#9FAEC6',
          300: '#6B82AB',
          400: '#3F5E8C',
          500: '#234574', // lines on navy
          600: '#14315A', // cards on navy
          700: '#0C2547',
          800: '#091C37',
          900: '#06142A',
        },

        // Honest status labels
        status: {
          done: '#1F6B3A',
          wip:  '#8A4B0A',
          dot:  '#C9781E',
        },

        // Hairlines / soft tints used by older pages
        hairline: 'rgba(23,25,28,0.14)',
        'hairline-strong': 'rgba(23,25,28,0.22)',
        'ink-soft': 'rgba(23,25,28,0.62)',
        'ink-mute': 'rgba(23,25,28,0.40)',
        'blue-soft': 'rgba(27,107,201,0.10)',

        // Semantic
        secondary: {
          50: '#effef8',
          100: '#dafeef',
          200: '#b8f8e0',
          300: '#81eed0',
          400: '#42dcb7',
          500: '#1dc19e',
          600: '#0e9b81',
          700: '#107c6a',
          800: '#126255',
          900: '#125048',
        },
        success: { 500: '#10b981' },
        warning: { 500: '#f59e0b' },
        error:   { 500: '#ef4444' },
      },

      fontFamily: {
        sans: ['Libre Franklin Variable', 'Libre Franklin', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Spectral', 'Georgia', 'serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero:     ['clamp(2.75rem, 6vw, 4.75rem)', { lineHeight: '1.02', letterSpacing: '-0.02em',  fontWeight: '600' }],
        display:  ['clamp(2.125rem, 4vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.015em', fontWeight: '600' }],
        eyebrow:  ['0.8125rem',                    { lineHeight: '1.4',  letterSpacing: '0.22em',   fontWeight: '400' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter:  '-0.025em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft:       '0 1px 2px rgba(12,37,71,0.04), 0 8px 24px rgba(12,37,71,0.06)',
        'soft-lg':  '0 2px 4px rgba(12,37,71,0.05), 0 24px 48px -12px rgba(12,37,71,0.10)',
        'soft-xl':  '0 4px 8px rgba(12,37,71,0.05), 0 40px 80px -16px rgba(12,37,71,0.12)',
        card:       '0 18px 40px rgba(12,37,71,0.14)',
        photo:      '0 24px 50px rgba(12,37,71,0.18)',
        'inset-line': 'inset 0 0 0 1px rgba(23,25,28,0.06)',
      },
      backdropBlur: { xs: '4px' },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in-up':  'fadeInUp 0.8s ease-out both',
        'float-slow':  'float 8s ease-in-out infinite',
        'shimmer':     'shimmer 2.4s linear infinite',
        'spotlight':   'spotlight 2s ease 0.75s 1 forwards',
      },
      keyframes: {
        fadeInUp: { '0%': { opacity: 0, transform: 'translateY(20px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float:    { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer:  { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        spotlight: {
          '0%':   { opacity: 0, transform: 'translate(-72%, -62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%, -40%) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
