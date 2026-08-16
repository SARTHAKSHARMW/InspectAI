/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0c', // near-black
        panel: '#121214', // charcoal
        panel_light: '#1e1e21', // graphite
        primary: '#00d2ff', // electric blue / cyan
        secondary: '#f59e0b', // controlled amber
        accent: '#ffffff',
        border: '#2a2a2e',
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cpath d=\"M0 0h40v40H0z\" fill=\"none\"/%3E%3Cpath d=\"M0 39.5h40v1H0z\" fill=\"rgba(255,255,255,0.05)\"/%3E%3Cpath d=\"M39.5 0v40h1V0z\" fill=\"rgba(255,255,255,0.05)\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
