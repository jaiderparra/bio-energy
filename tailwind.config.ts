import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        condensed: ['Barlow Condensed', 'sans-serif'],
        body: ['Barlow', 'sans-serif'],
      },
      colors: {
        gold: {
          DEFAULT: '#c8952a',
          light: '#e8b84b',
        },
        accent: {
          orange: '#e05c1a',
          green: '#1a9e5c',
        },
        bg: {
          primary: '#050a0e',
          secondary: '#0a1520',
          card: '#0d1b2a',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'scan': 'scan-line 4s linear infinite',
      },
      transitionDuration: {
        '400': '400ms',
        '800': '800ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
}

export default config