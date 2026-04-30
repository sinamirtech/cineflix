import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0b10",
        panel: "#13131c",
        accent: "#e50914",
        accent2: "#ff2a36",
        muted: "#9aa0a6"
      },
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] }
    }
  },
  plugins: []
};
export default config;
