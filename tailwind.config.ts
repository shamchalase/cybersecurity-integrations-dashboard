import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#101b31",
        navy: "#0a1427",
        electric: "#356df3",
        cyan: "#21c6d7"
      }
    }
  },
  plugins: []
};
export default config;
