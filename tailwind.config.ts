import type { Config } from 'tailwindcss';
import { colorVarsPlugin } from './src/plugins/colorVarsPlugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '344px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: {
          0: '#383366',
          1: '#544582',
          2: '#7461AB',
          3: '#A183D4',
          4: '#C6AEEB',
          5: '#F1E8FF',
        },
        secondary: {
          0: '#87102C',
          1: '#A03049',
          2: '#AB5669',
          3: '#C7788B',
          4: '#E9A4B6',
          5: '#FCDEE6',
        },
        grey: {
          0: '#1A1A1A',
          1: '#4D4D4D',
          2: '#808080',
          3: '#B3B3B3',
          4: '#E6E6E6',
          5: '#FFFFFF',
        },
      },
      backgroundImage: {
        'landing-gradient': 'linear-gradient(to bottom right, rgba(15, 15, 15, 1), rgba(35, 35, 35, 1))',
        'cursor-gradient': 'radial-gradient(circle, rgb(193, 202, 246, 0.3) 0%, rgba(0, 0, 0, 0) 50%)',
      },
      boxShadow: {
        'custom': '0 0 40px 5px #ECECEC',
        'dark-custom': '0 0 40px 5px rgba(25, 25, 25, 1)',
      },
    },
  },
  plugins: [
    colorVarsPlugin,
  ],
};
export default config;
