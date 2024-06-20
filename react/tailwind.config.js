/** @type {import('tailwindcss').Config} */
// const tailwindConfig = require("tailwindcss/stubs/tailwind.config");
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        './node_modules/@headlessui/react/**/*.js',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
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
                gray: {
                    DEFAULT: '#6B7280', // Example gray color
                    light: '#D1D5DB',  // Light gray color
                },
                "primary-500": "#877EFF",
                "secondary-500": "#FFB620",
                blue: "#0095F6",
                "logout-btn": "#FF5A5A",
                "navbar-menu": "rgba(16, 16, 18, 0.6)",
                "dark-1": "#000000",
                "dark-2": "#121417",
                "dark-3": "#101012",
                "dark-4": "#1F1F22",
                "light-1": "#FFFFFF",
                "light-2": "#EFEFEF",
                "light-3": "#7878A3",
                "light-4": "#5C5C7B",
                "gray-1": "#697C89",
                "reddit-orange": "#FF4500",
                "glassmorphism": "rgba(16, 16, 18, 0.60)",
            },
            screens: {
                xs: "400px",
            },
            fontSize: {
                "heading1-bold": [
                    "36px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading1-semibold": [
                    "36px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "heading2-bold": [
                    "30px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading2-semibold": [
                    "30px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "heading3-bold": [
                    "24px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "heading4-medium": [
                    "20px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "body-bold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "body-semibold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "body-medium": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "body-normal": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "body1-bold": [
                    "18px",
                    {
                        lineHeight: "140%",
                        fontWeight: "700",
                    },
                ],
                "base-regular": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "base-medium": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "base-semibold": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "base1-semibold": [
                    "16px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "small-regular": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "400",
                    },
                ],
                "small-medium": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "small-semibold": [
                    "14px",
                    {
                        lineHeight: "140%",
                        fontWeight: "600",
                    },
                ],
                "subtle-medium": [
                    "12px",
                    {
                        lineHeight: "16px",
                        fontWeight: "500",
                    },
                ],
                "subtle-semibold": [
                    "12px",
                    {
                        lineHeight: "16px",
                        fontWeight: "600",
                    },
                ],
                "tiny-medium": [
                    "10px",
                    {
                        lineHeight: "140%",
                        fontWeight: "500",
                    },
                ],
                "x-small-semibold": [
                    "7px",
                    {
                        lineHeight: "9.318px",
                        fontWeight: "600",
                    },
                ],
            }
        },

    },
    plugins: [
    ],
}
