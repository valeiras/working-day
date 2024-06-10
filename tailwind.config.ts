import type { Config } from "tailwindcss";
import themes from "daisyui/src/theming/themes";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        business: {
          ...themes["business"],
          ["--rounded-btn"]: ".5rem",
        },
      },
    ],
  },
};
export default config;
