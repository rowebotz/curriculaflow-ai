/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['"Fredericka the Great"', 'serif'],
  			body: ['"Patrick Hand"', '"Comic Neue"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        paper: '#fdfbf7',
        highlighter: '#FFD23F',
        correction: '#EE4266',
        ink: '#3B3B3B',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			}
  		},
  		boxShadow: {
  			sketch: '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'sketch-hover': '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'sketch-lg': '8px 8px 0px 0px rgba(0, 0, 0, 1)',
  		},
      borderWidth: {
        '3': '3px',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}