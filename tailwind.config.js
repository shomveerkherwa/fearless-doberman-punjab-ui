/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red:        "#E20612",
          bg:         "#0d0d0d",
          surface:    "#111111",
          border:     "#1e1e1e",
          "border-2": "#2a2a2a",
          text:       "#f0ede8",
          muted:      "#888888",
          faint:      "#444444",
        },
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans:    ["Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
        widest3: "0.3em",
      },
    },
  },
  plugins: [],
}

