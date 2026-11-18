/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Triksha brand palette ─────────────────────────────────────
        // Ink (primary text — near-black)
        ink: {
          DEFAULT: '#16191D',
          50:  '#F0F0F1',
          100: '#E1E1E3',
          200: '#C5C6C9',
          300: '#A1A3A6',
          400: '#7A7C80',
          500: '#56585C',
          600: '#3D4045',
          700: '#2A2D31',
          800: '#1F2126',
          900: '#16191D',
          950: '#0D1014',
        },

        // Canvas (cream backgrounds + paper cards)
        canvas: {
          DEFAULT: '#F3ECDB', // warm paper — primary background
          soft:    '#ECE2CC', // sand — alternating section
          paper:   '#FBF7EC', // off-white paper — card surfaces
          warm:    '#FBF7EC', // alias
        },

        // Accent (Triksha blue) — primary #0571d3 (LOCKED)
        accent: {
          50:  '#ECF4FD',
          100: '#D3E6FB',
          200: '#A9CFF6',
          300: '#74B0EF',
          400: '#2E8CE6',
          500: '#0571D3', // ← Triksha blue (primary accent) — LOCKED
          600: '#045CAE',
          700: '#0B4C99', // ← deep blue / accent shadow
          800: '#093E7E',
          900: '#072E60',
          sky: '#6FB6FF', // on-navy light blue
        },

        // Alias kept for any legacy `primary-*` usage
        primary: {
          50:  '#ECF4FD',
          100: '#D3E6FB',
          200: '#A9CFF6',
          300: '#74B0EF',
          400: '#2E8CE6',
          500: '#0571D3',
          600: '#045CAE',
          700: '#0B4C99',
          800: '#093E7E',
          900: '#072E60',
        },

        // Navy (statement-slide background)
        navy: {
          DEFAULT: '#0A2A52',
          50:  '#E6EBF2',
          100: '#C8D1DE',
          200: '#9FAEC6',
          300: '#6B82AB',
          400: '#3F5E8C',
          500: '#143D6D',
          600: '#0C3160',
          700: '#0A2A52', // ← statement bg
          800: '#082143',
          900: '#061833',
        },

        // Hairlines / soft tints derived from ink — use rgba so they
        // blend correctly over either cream or navy.
        hairline: 'rgba(22,25,29,0.14)',
        'hairline-strong': 'rgba(22,25,29,0.22)',
        'ink-soft': 'rgba(22,25,29,0.62)',
        'ink-mute': 'rgba(22,25,29,0.40)',
        'blue-soft': 'rgba(5,113,211,0.10)',

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
        sans: [
          'Geist Variable',
          'Geist',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        display: [
          'Geist Variable',
          'Geist',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'sans-serif',
        ],
        mono: ['Geist Mono Variable', 'Geist Mono', 'ui-monospace', 'SF Mono', 'monospace'],
      },
      fontSize: {
        hero:     ['clamp(2.75rem, 7vw, 5.75rem)', { lineHeight: '1.04', letterSpacing: '-0.035em', fontWeight: '600' }],
        display:  ['clamp(2rem, 4.5vw, 3.5rem)',   { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '600' }],
        eyebrow:  ['0.8125rem',                    { lineHeight: '1',    letterSpacing: '0.02em',  fontWeight: '500' }],
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
        // Slightly warmer shadows for cream surfaces
        soft:       '0 1px 2px rgba(11,38,80,0.04), 0 8px 24px rgba(11,38,80,0.06)',
        'soft-lg':  '0 2px 4px rgba(11,38,80,0.05), 0 24px 48px -12px rgba(11,38,80,0.10)',
        'soft-xl':  '0 4px 8px rgba(11,38,80,0.05), 0 40px 80px -16px rgba(11,38,80,0.12)',
        'inset-line': 'inset 0 0 0 1px rgba(22,25,29,0.06)',
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
