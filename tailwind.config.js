/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0F172A', // Slate-900 (Deep Blue/Black)
                    light: '#334155', // Slate-700
                    dark: '#020617', // Slate-950
                },
                secondary: {
                    DEFAULT: '#3B82F6', // Blue-500
                    foreground: '#FFFFFF',
                    light: '#60A5FA', // Blue-400
                },
                background: '#F8FAFC', // Slate-50
                surface: '#FFFFFF',
                text: {
                    primary: '#1E293B', // Slate-800
                    secondary: '#64748B', // Slate-500
                    tertiary: '#94A3B8', // Slate-400
                    inverse: '#FFFFFF',
                },
                fuel: {
                    diesel: '#1E293B', // Slate-800
                    gas95: '#10B981', // Emerald-500
                    gas98: '#059669', // Emerald-600
                    highlight: '#F59E0B', // Amber-500
                    alert: '#EF4444', // Red-500
                },
                border: '#E2E8F0', // Slate-200
            },
            fontFamily: {
                // Add custom fonts here if we add them later
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                'card': '0 2px 10px rgba(0, 0, 0, 0.03), 0 10px 25px -5px rgba(0, 0, 0, 0.04)',
                'card-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
            }
        },
    },
    plugins: [],
}