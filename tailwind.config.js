// tailwind.config.js

import typography from '@tailwindcss/typography';
import plugin from 'tailwindcss/plugin';
import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./blog/**/*.{md,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...fontFamily.sans],
        serif: ['Lora', ...fontFamily.serif],
      },
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        'text-muted': 'rgb(var(--color-text-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        // Added the secondary accent color
        'accent-secondary': 'rgb(var(--color-accent-secondary) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)'
      },
      keyframes: {
        // Renamed to be more descriptive and avoid conflict
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
      },
      animation: {
        // Added the new animation utility
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.gray[700]'),
            '--tw-prose-headings': theme('colors.foreground'),
            // ... (your existing typography config)
          },
        },
      }),
    },
  },
  plugins: [
    typography,
    // Added a custom plugin for text-shadow utilities
    plugin(function({ addUtilities, theme }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: `0 1px 2px ${theme('colors.black / 0.15')}`
        },
        '.text-shadow-lg': {
          textShadow: `0 4px 10px ${theme('colors.black / 0.15')}`
        },
      }
      addUtilities(newUtilities)
    })
  ],
}