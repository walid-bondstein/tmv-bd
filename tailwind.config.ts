import { nextui } from '@nextui-org/theme'
import animate from 'tailwindcss-animate'
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/{button,ripple,spinner}.js',
  ],

  theme: {
    extend: {
      keyframes: {
        'slide-in-from-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        spinAndMoveToLeft: {
          '0%': {
            transform: 'translateX(0%) rotate(0deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          '10%,65%': { boxShadow: '0 0px 0px 0px transparent' },
          '70%': {
            transform: 'translateX(30px) rotate(390deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          '100%': {
            transform: 'translateX(30px) rotate(360deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
        spinAndMoveToRight: {
          '0%': {
            transform: 'translateX(30px) rotate(360deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          '10%,65%': { boxShadow: '0 0px 0px 0px transparent' },
          '70%': {
            transform: 'translateX(0%) rotate(-30deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          '100%': {
            transform: 'translateX(0%) rotate(0deg)',
            boxShadow:
              '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        },
      },
      animation: {
        'slide-in-from-right': 'slide-in-from-right 2s ease-out',
        spinAndMoveToLeft: 'spinAndMoveToLeft 0.5s ease-out 1 forwards',
        spinAndMoveToRight: 'spinAndMoveToRight 0.5s ease-out 1 forwards',
      },
      colors: {
        webPrimary: '#fdd10e',
        webSecondary: '#f9a917',
        background: '#fff',
        foreground: 'black',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: '#fdd10e',
          foreground: 'black',
        },
        secondary: {
          DEFAULT: '#f9a917',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'mesh-soft': `
          radial-gradient(at 0% 0%, #FFF8E2 0, transparent 42%),
          radial-gradient(at 10% 90%, #E8FAFE 0, transparent 50%),
          radial-gradient(at 91% 11%, #E8FAFE 0, transparent 30%),
          radial-gradient(at 100% 100%, #FFF8E2 0, transparent 36%)
        `,
      },
      backgroundColor: {
        'mesh-soft': '#fdd10e',
      },
    },
  },

  plugins: [nextui(), animate],
}

export default config
