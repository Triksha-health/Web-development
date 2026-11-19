/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Triksha palette ────────────────────────────────────────────
        // The colours that differ between dark and light sections are CSS
        // variables (see :root and .theme-light in index.css).
        // The names are kept from the earlier light theme so existing classes
        // keep working: `canvas` is the ground, `ink` is the text on it.
        // Ink (primary text)
        ink: {
          DEFAULT: 'rgb(var(--ink) / <alpha-value>)',
          50:  '#0F1B30',
          100: '#16263F',
          200: '#22365A',
          300: 'rgb(var(--ink-300) / <alpha-value>)',
          400: '#8496B5',
          500: '#9FAEC6',
          600: '#B5C1D4',
          700: '#C6CFDC',
          800: '#E1E5EC',
          900: 'rgb(var(--ink) / <alpha-value>)', // main text
          950: '#FFFFFF',
        },
        body:  'rgb(var(--body) / <alpha-value>)', // paragraph text
        muted: 'rgb(var(--muted) / <alpha-value>)', // captions, small labels

        // Cream ground + raised surfaces
        canvas: {
          DEFAULT: 'rgb(var(--canvas) / <alpha-value>)', // ground
          soft:    'rgb(var(--canvas-soft) / <alpha-value>)', // image wells
          paper:   'rgb(var(--canvas-paper) / <alpha-value>)', // alternate sections and raised surfaces
          warm:    'rgb(var(--canvas-paper) / <alpha-value>)', // alias
        },
        cream: '#F3EEE3', // text on navy
        line: {
          DEFAULT: 'rgb(var(--line) / <alpha-value>)',
          strong:  'rgb(var(--line-strong) / <alpha-value>)',
        },

        // Accent blue: 500 = buttons + highlighted words, 600 = small labels
        accent: {
          50:  '#EEF4FB', // text on the blue waitlist band
          100: 'rgb(var(--accent-100) / <alpha-value>)', // chip background
          200: '#1F4477',
          300: 'rgb(var(--accent-300) / <alpha-value>)', // highlighted words
          400: '#4E93DE',
          500: '#1B6BC9', // buttons
          600: 'rgb(var(--accent-600) / <alpha-value>)', // small labels and links
          700: 'rgb(var(--accent-700) / <alpha-value>)', // chip text
          800: '#C9E0FA',
          900: '#0C2547',
          sky: '#8EBDF2',
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
          done: 'rgb(var(--status-done) / <alpha-value>)',
          wip:  'rgb(var(--status-wip) / <alpha-value>)',
          dot:  'rgb(var(--status-dot) / <alpha-value>)',
        },

        // Hairlines / soft tints used by older pages
        hairline: 'rgba(243,238,227,0.14)',
        'hairline-strong': 'rgba(243,238,227,0.22)',
        'ink-soft': 'rgba(243,238,227,0.70)',
        'ink-mute': 'rgba(243,238,227,0.50)',
        'blue-soft': 'rgba(142,189,242,0.14)',

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
        display: ['Inter Tight Variable', 'Inter Tight', 'Libre Franklin Variable', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        hero:     ['clamp(2.75rem, 5.9vw, 5.5rem)', { lineHeight: '0.98', letterSpacing: '-0.02em',  fontWeight: '500' }],
        display:  ['clamp(2rem, calc(1.375rem + 2.2vw), 3.5rem)', { lineHeight: '1.08', letterSpacing: '-0.01em', fontWeight: '500' }],
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
