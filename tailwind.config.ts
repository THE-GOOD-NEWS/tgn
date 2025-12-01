import type { Config } from "tailwindcss";

const config: Config = {
  // darkMode: ["class"], // Disabled dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            color: "hsl(var(--foreground))",
            hr: { borderColor: "hsl(var(--border))" },
            strong: { color: "hsl(var(--foreground))" },
            "h1, h2, h3, h4": { color: "hsl(var(--foreground))" },
            "h1 strong, h2 strong, h3 strong, h4 strong": {
              fontWeight: "inherit",
            },

            // Links
            a: {
              color: theme("colors.hot-pink"),
              textDecorationColor: theme("colors.hot-pink"),
              textUnderlineOffset: "4px",
              textDecorationThickness: "2px",
              fontWeight: "600",
            },
            "a:hover": {
              color: theme("colors.purple"),
              textDecorationColor: theme("colors.purple"),
            },

            // Blockquotes
            blockquote: {
              color: "hsl(var(--muted-foreground))",
              borderLeftColor: theme("colors.hot-pink"),
              borderLeftWidth: "4px",
              paddingLeft: "1rem",
              fontStyle: "normal",
            },
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:last-of-type::after": { content: "none" },

            // List markers
            "ul > li::marker": { color: theme("colors.hot-pink") },
            "ol > li::marker": { color: theme("colors.purple") },

            // Inline code
            code: {
              color: "hsl(var(--foreground))",
              backgroundColor: theme("colors.muted.DEFAULT"),
              borderRadius: "0.375rem",
              padding: "0.25rem 0.375rem",
              borderColor: "hsl(var(--border))",
              borderWidth: "1px",
            },
            "code::before": { content: "none" },
            "code::after": { content: "none" },

            // Preformatted code blocks
            pre: {
              color: "hsl(var(--foreground))",
              backgroundColor: theme("colors.muted.DEFAULT"),
              borderColor: "hsl(var(--border))",
              borderWidth: "1px",
              borderRadius: "0.75rem",
              padding: "1rem",
              overflowX: "auto",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderWidth: "0",
            },
            "pre code::before": { content: "none" },
            "pre code::after": { content: "none" },
            // Softer line breaks
            br: {
              display: "block",
              lineHeight: "0",
              marginTop: "0.25em",
              marginBottom: "0.25em",
            },
          },
        },
      }),
      fontFamily: {
        // Arabic fonts
        "arabic-header": ["Frutiger LT Arabic", "Arial", "sans-serif"],
        "arabic-subheading": ["Raqami Arabic", "Arial", "sans-serif"],
        "arabic-body": ["Graphik Arabic", "Arial", "sans-serif"],

        // English fonts
        "english-header": [
          "Helvetica Neue Heavy",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        "english-subheading": [
          "Bitend Mono",
          "Inter",
          "system-ui",
          "monospace",
        ],
        "english-body": ["Visby Regular", "Inter", "system-ui", "sans-serif"],

        // Legacy font families for backward compatibility
        arabic: ["Graphik Arabic", "Arial", "sans-serif"],
        "arabic-heading": ["Frutiger LT Arabic", "Arial", "sans-serif"],
        english: ["Visby Regular", "Inter", "system-ui", "sans-serif"],
        "english-heading": [
          "Helvetica Neue Heavy",
          "Inter",
          "system-ui",
          "sans-serif",
        ],

        // Default fallbacks
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        // Custom brand colors
        cream: "#F6EDDD",
        "hot-pink": "#FF9ACC",
        "bright-yellow": "#FFFF32",
        purple: "#9966FF",

        // Dark mode variants
        "cream-dark": "#2D2620",
        "hot-pink-dark": "#B8679C",
        "bright-yellow-dark": "#D4D428",

        // Existing shadcn colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        float: "float 4s ease-in-out infinite",

        "bounce-soft": "bounceSoft 2s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
