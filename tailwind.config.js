/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./resources/**/*.blade.php",
		"./resources/**/*.jsx",
		'node_modules/preline/dist/*.js',
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('preline/plugin'),
	],
}