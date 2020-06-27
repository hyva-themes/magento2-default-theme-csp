const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        colors: {
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            indigo: colors.indigo,
            red: colors.red,
            yellow: colors.yellow,
            green: colors.green,
            primary: {
                lighter: '#e7e7e7',
                default: '#3e3e3e',
                darker: '#000000',
            },
            secondary: {
                lighter: '#f5f2f2',
                default: '#e2dede',
                darker: '#d7d3d3',
            },
            background: {
                lighter: '#fdf8f5',
                default: '#F8EBE6',
                darker: '#f5d7d1',
            }
        },
        screens: {
            'sm': '640px',
            // => @media (min-width: 640px) { ... }
            'md': '768px',
            // => @media (min-width: 768px) { ... }
            'lg': '1024px',
            // => @media (min-width: 1024px) { ... }
            'xl': '1280px',
            // => @media (min-width: 1280px) { ... }
        },
        minHeight: {
            '0': '0',
            '25': '25vh',
            '50': '50vh',
            '75': '75vh',
            'full': '100%',
        },
        maxHeight: {
            '0': '0',
            '25': '25vh',
            '50': '50vh',
            '75': '75vh',
            'full': '100%',
        }
    },
    variants: {
        borderWidth: ['responsive', 'last', 'hover', 'focus'],
        margin: ['responsive', 'last', 'hover', 'focus'],
    },
    plugins: [],
    purge: {
        // enabled: false,
        content: [
            '../../**/*.phtml',
            './src/**/*.phtml'
        ]
    }
}
