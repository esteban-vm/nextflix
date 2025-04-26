// @ts-nocheck

import type { Config } from 'tailwindcss'
import twTextShadow from '@designbycode/tailwindcss-text-shadow'
import twFluid, { extract, fontSize, screens } from 'fluid-tailwind'
import twMobileHover from 'tailwind-mobile-hover'
import plugin from 'tailwindcss/plugin'
import twAnimate from 'tailwindcss-animate'
import twTouch from 'tailwindcss-touch'

const utils = plugin(function ({ addUtilities }) {
  addUtilities({
    '.centered': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    },
  })
})

const tailwindConfig: Config = {
  content: {
    extract,
    files: ['./(app|components|pages)/**/*.{js,ts,jsx,tsx,mdx}'],
  },
  darkMode: 'selector',
  theme: {
    fontSize,
    screens,
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
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
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'geist-sans': 'var(--font-geist-sans)',
        'geist-mono': 'var(--font-geist-mono)',
      },
    },
  },
  plugins: [twFluid, twAnimate, twTextShadow, twTouch(), twMobileHover, utils],
}

export default tailwindConfig
