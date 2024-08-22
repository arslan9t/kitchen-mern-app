/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			animation: {
				fade: "fadeIn .5s ease-in-out",
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
			gridTemplateColumns: {
				// Simple 16 column grid
				16: "repeat(16, minmax(0, 1fr))",

				// Complex site-specific column configuration
				footer: "200px minmax(900px, 1fr) 100px",
			},
		},
	},
	plugins: [],
};
