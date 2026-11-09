/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bg-base': '#0a0a0a',
        'bg-card': '#141416',
        'bg-input': '#18181b',
        'bg-elevated': '#1e1e22',
        'border-default': '#27272a',
        'border-focus': '#3b82f6',
        'text-primary': '#f4f4f5',
        'text-secondary': '#a1a1aa',
        'text-muted': '#71717a',
        accent: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
        },
        danger: '#ef4444',
        success: '#22c55e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

