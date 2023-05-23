// /** @type {import('tailwindcss').Config} */

const coolGray = {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
};

const gray = {
    100: "#eeeeee",
    200: "#e0e0e0",
    300: "#bbbbbb",
    400: "#666666",
    500: "#444444",
    650: "#333",
    600: "#2a2a2a",
    700: "#1f1f1f",
    800: "#181818",
    900: "#0f0f0f",
};

const brand = {
    100: "#c5f1dd",
    200: "#c5f1dd",
    300: "#9fe7c7",
    400: "#65d9a5",
    500: "#24b47e",
    600: "#38bc81",
    700: "#1c8656",
    800: "#10633e",
    900: "#10633e",
};

const blueGray = {
    50: "#F8FAFC",
    100: "#F1F5F9",
    // 200: "#E2E8F0",
    // 300: "#CBD5E1",
    // 400: "#94A3B8",
    // 500: "#64748B",
    // 600: "#475569",
    // 700: "#334155",
    // 800: "#1E293B",
    // 900: "#0F172A",
};

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                /** Main */
                ["brandColor"]: "#2b825b",
                ["brandPaltte"]: { ...brand },

                /** Used for backgrounds */
                ["primary-background"]: "#1c1c1c", // main app bg
                ["secondary-background"]: "#232323", // used for cards
                ["alt-background"]: "#2e2e2e", // used for button

                /** Ignored: Used for borders, inputs and text */

                /** Typography */
                "typography-body": {
                    light: coolGray[600],
                    dark: gray[100],
                },
                "typography-body-secondary": {
                    light: coolGray[500],
                    dark: gray[300],
                },
                "typography-body-strong": {
                    light: coolGray[100],
                    dark: "white",
                },
                "typography-body-faded": {
                    light: coolGray[400],
                    dark: gray[400],
                },

                /** App backgrounds */
                "bg-primary": {
                    light: "white",
                    dark: gray[800],
                },
                "bg-secondary": {
                    light: blueGray[100],
                    dark: gray[700],
                },
                "bg-alt": {
                    light: blueGray[50], // gray[100],
                    dark: gray[600],
                },

                /** Forms */
                "input-value": {
                    light: coolGray[600],
                    dark: gray[200],
                },
                "input-placeholder": {
                    light: coolGray[300],
                    dark: gray[400],
                },
                "input-border": {
                    light: coolGray[300],
                    dark: gray[500],
                },
                "input-label": {
                    light: coolGray[600],
                    dark: gray[200],
                },
                "input-border-hover": {
                    light: coolGray[400],
                    dark: gray[400],
                },
                "input-border-focus": {
                    light: brand[300],
                    dark: brand[300],
                },
            },
            screens: {
                xs: "480px",
            },
            fontFamily: {
                sans: [
                    "custom-font",
                    "Helvetica Neue",
                    "Helvetica",
                    "Arial",
                    "sans-serif",
                ],
                mono: [
                    "Office Code Pro",
                    "Source Code Pro",
                    "Menlo",
                    "monospace",
                ],
            },
            keyframes: {
                wiggle: {
                    "0%": { transform: "translate(0%)" },
                    "100%": { transform: "translate(200%)" },
                },
            },
            animation: {
                wiggle: "wiggle 1s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
