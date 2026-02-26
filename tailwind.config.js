/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		fontFamily: {
  			display: ['Inter', 'sans-serif'],
  			body: ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
        paper: '#FAFAFA',
        brand: {
          primary: '#E21A23', // McGraw Hill Red
          black: '#000000',
          gray: '#71717A',
        },
        highlighter: '#E21A23', // Mapping old keys to new brand for compatibility
        correction: '#E21A23',
        ink: '#000000',
  			primary: {
  				DEFAULT: '#E21A23',
  				foreground: '#FFFFFF'
  			},
  			border: '#000000',
  			input: 'hsl(var(--input))',
  			ring: '#E21A23',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			}
  		},
  		boxShadow: {
  			sketch: '2px 2px 0px 0px rgba(0, 0, 0, 1)',
        'sketch-hover': '1px 1px 0px 0px rgba(0, 0, 0, 1)',
        'sketch-lg': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
  		},
      borderWidth: {
        '3': '3px',
      }
  	}
  },
  plugins: [require("tailwindcss-animate")]
}