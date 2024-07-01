const defaultTheme = require('tailwindcss/defaultTheme')
const animate = require("tailwindcss-animate")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  theme: {
    // colors: {
    //   main: {
    //     light: 'hsl(160, 100%, 50%)',  // Lighter shade
    //     DEFAULT: 'hsl(160, 60%, 30%)', // Base color
    //     dark: 'hsl(160, 60%, 20%)',    // Darker shade
    //   },
    //   yellow: {
    //     light: 'hsl(45, 100%, 70%)',   // Lighter shade
    //     DEFAULT: 'hsl(45, 100%, 50%)', // Base color
    //     dark: 'hsl(45, 100%, 40%)',    // Darker shade
    //   },
    //   clear: {
    //     light: 'hsl(30, 50%, 90%)',    // Lighter shade
    //     DEFAULT: 'hsl(30, 50%, 80%)',  // Base color
    //     dark: 'hsl(30, 50%, 60%)',     // Darker shade
    //   },
    //   back: {
    //     light: 'hsl(0, 0%, 25%)',      // Lighter shade
    //     DEFAULT: 'hsl(0, 0%, 5%)',     // Base color
    //     dark: 'hsl(0, 0%, 2%)',        // Darker shade
    //   },
    // },
    fontFamily: {
      berk: ["Berkshire Swash"],
      kurale: ["Kurale"],
      roboto: ["Roboto"],
      pacifico: ["Pacifico"],
      lato: ["Lato"],
      // berk: ["Berkshire Swash", ...defaultTheme.fontFamily.sans],
      // kurale: ["Kurale", ...defaultTheme.fontFamily.sans],
      // roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      // lato: ["Lato", ...defaultTheme.fontFamily.sans],
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [
    animate,
    require('@tailwindcss/typography')
  ],
}

