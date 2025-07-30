// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{html,ts}", // <-- required for Angular
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--color-border)", // allow border-border to work
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        // Add more if needed...
      },
    },
  },
  darkMode: "class", // Important for dark mode via `class="dark"`
  plugins: [],
};
