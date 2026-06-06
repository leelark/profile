/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
        display: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"]
      },
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        elevated: "rgb(var(--color-elevated) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        text: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        accentSoft: "rgb(var(--color-accent-soft) / <alpha-value>)",
        blueSignal: "rgb(var(--color-blue-signal) / <alpha-value>)",
        verified: "rgb(var(--color-verified) / <alpha-value>)",
        caution: "rgb(var(--color-caution) / <alpha-value>)"
      },
      borderRadius: {
        portfolio: "8px"
      },
      boxShadow: {
        panel: "0 24px 80px rgb(0 0 0 / 0.18)"
      },
      maxWidth: {
        reading: "900px",
        shell: "1180px"
      }
    }
  },
  plugins: []
};
