import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "LinkOptimizer-primary": "#3b2108",
        "LinkOptimizer-secondary": "#c6a687",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        'rotate-down': {
          from: { transform: "rotate(15deg)" },
          to: { transform: "rotate(0)" },
        },
        'rotate-up': {
          from: { transform: "rotate(-15deg)" },
          to: { transform: "rotate(0)" },
        },
        'slide-up': {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        'text-move': {
          '0%': {
            'letter-spacing': '1px',
            transform: 'translateX(0px)',
          },
        
          '40%': {
            'letter-spacing': '2px',
            transform: 'translateX(26px)',
          },
        
          '80%': {
            'letter-spacing': '1px',
            transform: 'translateX(32px)',
          },
        
          '90%': {
            'letter-spacing': '2px',
            transform: 'translateX(0px)',
          },
        
          '100%': {
            'letter-spacing': '1px',
            transform: 'translateX(0px)',
          },
        },
        
        'loading': {
          '0%': {
            width: '16px',
            transform: 'translateX(0px)',
          },
        
          '40%': {
            width: '100%',
            transform: 'translateX(0px)',
          },
        
          '80%': {
            width: '16px',
            transform: 'translateX(64px)',
          },
        
          '90%': {
            width: '100%',
            transform: 'translateX(0px)',
          },
        
          '100%': {
            width: '16px',
            transform: 'translateX(0px)',
          },
        },
        
        'loading2': {
          '0%': {
            transform: 'translateX(0px)',
            width: '16px',
          },
        
          '40%': {
            transform: 'translateX(0%)',
            width: '80%',
          },
        
          '80%': {
            width: '100%',
            transform: 'translateX(0px)',
          },
        
          '90%': {
            width: '80%',
            transform: 'translateX(15px)',
          },
        
          '100%': {
            transform: 'translateX(0px)',
            width: '16px',
          },
        }
         
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rotate-down": "rotate-down 0.3s ease-out",
        "rotate-up": "rotate-up 0.3s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
        "text-move": "text-move 3.5s ease both infinite",
        "loading": "loading 3.5s ease both infinite",
        "loading2": "loading2 3.5s ease both infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config