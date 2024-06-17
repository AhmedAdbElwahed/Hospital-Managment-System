/** @type {import('tailwindcss').Config} */
// const tailwindConfig = require("tailwindcss/stubs/tailwind.config");
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './node_modules/@headlessui/react/**/*.js',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    "50": "#eff6ff",
                    "100": "#dbeafe",
                    "200": "#bfdbfe",
                    "300": "#93c5fd",
                    "400": "#60a5fa",
                    "500": "#3b82f6",
                    "600": "#2563eb",
                    "700": "#1d4ed8",
                    "800": "#1e40af",
                    "900": "#1e3a8a",
                    "950": "#172554"
                },
                blue: {
                    DEFAULT: '#1E40AF', // Example blue color
                    light: '#3B82F6',  // Light blue color
                },
                gray: {
                    DEFAULT: '#6B7280', // Example gray color
                    light: '#D1D5DB',  // Light gray color
                },
            }
        },

    },
    plugins: [
    ],
}
