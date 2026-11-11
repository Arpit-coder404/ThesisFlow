/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F5F1',
        surface: '#FFFFFF',
        'surface-subtle': '#FAF9F6',
        'sidebar-bg': '#F0F0E9',
        border: '#E5E4DC',
        'border-strong': '#D3D1C5',
        primary: {
          DEFAULT: '#242923',
          muted: '#454B43',
        },
        secondary: '#72786F',
        forest: {
          50: '#F2F6F3',
          100: '#E2ECE4',
          500: '#345B46',
          600: '#2A4B39',
          700: '#20392C',
        },
        sage: {
          DEFAULT: '#E6ECE5',
          light: '#F2F6F2',
          border: '#D0DDD0',
        },
        terracotta: {
          DEFAULT: '#B96D50',
          light: '#F8ECE7',
          hover: '#A35D42',
        },
        softYellow: {
          DEFAULT: '#F2E9D1',
          light: '#F9F5EC',
        },
      },
      fontFamily: {
        serif: ['"Newsreader"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        editor: ['"Source Serif 4"', 'Newsreader', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(36, 41, 35, 0.04), 0 1px 2px rgba(36, 41, 35, 0.02)',
        'academic': '0 4px 20px -2px rgba(36, 41, 35, 0.06), 0 2px 6px -1px rgba(36, 41, 35, 0.03)',
        'modal': '0 20px 40px -8px rgba(36, 41, 35, 0.12), 0 10px 16px -4px rgba(36, 41, 35, 0.06)',
      }
    },
  },
  plugins: [],
}

