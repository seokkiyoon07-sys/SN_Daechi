import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sn-bg': '#F3F7F3',
        'sn-bg-light': '#f8faf8',
        'sn-bg-dark': '#e8ede8',
        'sn-green': '#4a7c59',
        'sn-green-light': '#5d9a6e',
        'sn-green-dark': '#3d6649',
        'sn-main': '#2b422e',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1.2s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;
